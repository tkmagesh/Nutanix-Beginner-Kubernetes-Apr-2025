const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.send(`PostgreSQL time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("Error in /:", err);
    res.status(500).send("Error fetching time");
  }
});

// Ensure table exists
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cost NUMERIC NOT NULL,
        units INTEGER NOT NULL
      )
    `);
    console.log(" Products table ensured.");
  } catch (err) {
    console.error(" Failed to create table:", err);
  }
})();

// GET all products
app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST new product
app.post("/products", async (req, res) => {
  const { name, cost, units } = req.body;
  console.log(`name=${name}, cost=${cost}, units=${units}`)
  if (!name || cost == null || units == null) {
    return res.status(400).json({ error: "Missing name, cost, or units" });
  }

  try {
    const result = await db.query(
      "INSERT INTO products (name, cost, units) VALUES ($1, $2, $3) RETURNING *",
      [name, cost, units]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).json({ error: "Failed to insert product" });
  }
});

app.listen(3000, () => console.log(" Node.js app running on port 3000"));
