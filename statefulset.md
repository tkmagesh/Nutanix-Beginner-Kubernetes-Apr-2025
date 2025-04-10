# StatefulSet
A **StatefulSet** in Kubernetes is a special kind of controller used to manage **stateful applications**, which are apps that require:

- Persistent storage
- Stable network identities
- Ordered, graceful deployment and scaling

---

###  What is a StatefulSet?

A **StatefulSet** manages the deployment and scaling of a set of Pods, **where each pod has a unique, stable identity and persistent storage**. It is used when your application needs to maintain state across restarts, like:

- Databases (PostgreSQL, MongoDB)
- Message queues (Kafka, RabbitMQ)
- Distributed systems (Zookeeper, Cassandra)

---

###  Difference Between Pod and StatefulSet

| Feature | Pod | StatefulSet |
|--------|-----|-------------|
| **Basic Role** | Smallest deployable unit | Controller to manage stateful pods |
| **Identity** | No stable identity (ephemeral) | Stable network identity (`pod-0`, `pod-1`, etc.) |
| **Storage** | Lost on pod recreation unless PVC attached manually | PersistentVolumeClaim is auto-bound and retained per pod |
| **Ordering** | No ordering guarantees | Ordered deployment, scaling, and termination |
| **Use Case** | Stateless apps like web servers | Stateful apps like databases |

---

###  Example Use Case

If you're deploying a PostgreSQL cluster:

- Using plain pods or Deployments = no guaranteed order or persistent identity → data loss risk.
- Using StatefulSet = stable hostnames (`pg-0`, `pg-1`...), PVC per pod, and restart order control → safe for production databases.

---

###  Quick YAML Snippet (StatefulSet)

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres"
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:16
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

StatefulSet has several key configuration options that control how your stateful pods behave—especially around identity, storage, and lifecycle. Here's a breakdown of the most important ones you can use when defining a `StatefulSet` in Kubernetes:

---

###  Core Configuration Options

#### 1. `serviceName`
- **Purpose**: Name of the  service used for stable DNS entries.
- **Type**: `string`
- **Example**: `"postgres"`
- **Note**: The StatefulSet will create pod hostnames like `pod-0.postgres.default.svc.cluster.local`.

---

#### 2. `replicas`
- **Purpose**: Number of pod replicas.
- **Type**: `int`
- **Default**: 1
- **Example**: `3`

---

#### 3. `selector`
- **Purpose**: Label selector that matches pods managed by the StatefulSet.
- **Type**: `LabelSelector`
- **Example**:
  ```yaml
  selector:
    matchLabels:
      app: postgres
  ```

---

#### 4. `template`
- **Purpose**: Pod template, just like in Deployments or ReplicaSets.
- **Type**: `PodTemplateSpec`
- **Includes**:
  - Labels
  - Containers (images, ports, env, volume mounts)
  - Volumes (but not persistent ones; see below)

---

#### 5. `volumeClaimTemplates`
- **Purpose**: Template for persistent storage. Each pod gets its own PVC.
- **Type**: `PersistentVolumeClaim[]`
- **Example**:
  ```yaml
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 1Gi
  ```
- **Note**: This is how `pod-0`, `pod-1`... get separate persistent volumes.

---

#### 6. `podManagementPolicy`
- **Purpose**: Controls the order of pod creation/deletion.
- **Values**:
  - `OrderedReady` (default): Creates pods one at a time, waiting for readiness.
  - `Parallel`: Creates all pods simultaneously.
- **Example**: `podManagementPolicy: Parallel`

---

#### 7. `updateStrategy`
- **Purpose**: Controls how updates are rolled out.
- **Type**: `StatefulSetUpdateStrategy`
- **Options**:
  - `RollingUpdate` (default)
  - `OnDelete`: Manual update—pods updated only when deleted.
- **Example**:
  ```yaml
  updateStrategy:
    type: RollingUpdate
  ```

---

#### 8. `revisionHistoryLimit`
- **Purpose**: Number of old revisions to keep.
- **Type**: `int`
- **Default**: 10
- **Example**: `revisionHistoryLimit: 3`

---

#### 9. `persistentVolumeReclaimPolicy` (indirect)
- **Note**: This isn't set in StatefulSet but affects its volumes.
- **Where**: Set in the `StorageClass` used by your PVCs.
- **Options**: `Delete` or `Retain`

---

### Tips When Using StatefulSet

- Always define a **service** with `clusterIP: None`.
- Use **unique volume names** in `volumeClaimTemplates`.
- If scaling down, remember: PVCs are not deleted unless you delete them manually.


To get a list of all StatefulSets running in your Kubernetes cluster (including those on Minikube), use this command:

```bash
kubectl get statefulsets
```

Or with the shorthand:

```bash
kubectl get sts
```

---

###  Additional Options

- **List StatefulSets in a specific namespace**:
  ```bash
  kubectl get sts -n your-namespace
  ```

- **Get more details**:
  ```bash
  kubectl describe statefulset <statefulset-name>
  ```

- **List with labels and status**:
  ```bash
  kubectl get sts -o wide
  ```

To inspect a **specific pod from a StatefulSet**, you just need to know its name (which follows a predictable pattern) and then use standard `kubectl` commands.

---

###  1. **Identify the Pod Name**

StatefulSet pods are named like this:

```
<statefulset-name>-<ordinal>
```

Example: if your StatefulSet is named `postgres`, the pods will be:

```
postgres-0
postgres-1
postgres-2
...
```

To list all pods:

```bash
kubectl get pods
```

Or within a specific namespace:

```bash
kubectl get pods -n <namespace>
```

---

### 🔍 2. **Inspect the Pod**

####  Basic Info:
```bash
kubectl describe pod postgres-0
```

####  View Logs:
```bash
kubectl logs postgres-0
```

> Add `-c <container-name>` if the pod has multiple containers.

####  Live Troubleshooting (Shell Access):
```bash
kubectl exec -it postgres-0 -- /bin/bash
```
or if it uses `sh`:
```bash
kubectl exec -it postgres-0 -- /bin/sh
```

####  View Pod YAML:
```bash
kubectl get pod postgres-0 -o yaml
```

---

In a **StatefulSet**, each pod gets a **stable DNS hostname** based on a predictable pattern.

---

###  DNS Name Format

The full DNS name of a pod in a StatefulSet looks like this:

```
<pod-name>.<service-name>.<namespace>.svc.cluster.local
```

Or broken down:
```
<statefulset-name>-<ordinal>.<serviceName>.<namespace>.svc.cluster.local
```

---

###  Example

If you have:

- **StatefulSet name**: `postgres`
- **service name**: `postgres`
- **Namespace**: `default`

Then pod `postgres-0` will have a DNS name:

```
postgres-0.postgres.default.svc.cluster.local
```

And `postgres-1` will be:

```
postgres-1.postgres.default.svc.cluster.local
```

---

###  Quick Check

To confirm the DNS is resolving correctly inside your cluster:

```bash
kubectl exec -it postgres-0 -- nslookup postgres-1.postgres
```

---
