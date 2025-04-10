const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

const outputPath = "/data/output.txt";

// Write to file every 3 seconds
setInterval(() => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(outputPath, `Timestamp: ${timestamp}\n`);
  console.log(`Wrote: ${timestamp}`);
}, 3000);

// Serve the file
app.get("/", (req, res) => {
  if (!fs.existsSync(outputPath)) {
    return res.send("No data written yet.");
  }
  const data = fs.readFileSync(outputPath, "utf8");
  res.type("text/plain").send(data);
});

app.listen(port, () => {
  console.log(`Viewer running at http://localhost:${port}`);
});
