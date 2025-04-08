

#  **Kubernetes Terms**

These are foundational concepts for anyone starting out with Kubernetes:

### 1. **Cluster**
- A **cluster** is a group of machines (nodes) running Kubernetes. It manages and runs containerized applications.
- Think of it like a factory (cluster) with workers (nodes) doing the actual work.

---

### 2. **Node**
- A **node** is a single machine (virtual or physical) in a Kubernetes cluster.
- Two types:  
  - **Master/Control Plane Node** – Manages the cluster.  
  - **Worker Node** – Runs your application.

---

### 3. **Pod**
- The smallest unit in Kubernetes.
- A **pod** wraps one or more containers with shared storage/network, and a specification for how to run the containers.

---

### 4. **Container**
- A **container** packages code, runtime, system tools, and libraries.
- Kubernetes runs containers using container runtimes like Docker or containerd.

---

### 5. **Deployment**
- A **deployment** ensures your application is running as expected by maintaining the desired number of pods.
- If a pod crashes, the deployment controller brings it back up automatically.

---

### 6. **Service**
- A **service** exposes your pods to the network.
- Types:
  - **ClusterIP**: Internal access only.
  - **NodePort**: Accessible on a port of every node.
  - **LoadBalancer**: Exposes externally via a cloud provider.

---

### 7. **Namespace**
- Think of a **namespace** as a virtual cluster within a cluster.
- Helps group and isolate resources.

---

### 8. **ReplicaSet**
- Ensures a specified number of **pod replicas** are running.
- Used by **Deployments** under the hood.

