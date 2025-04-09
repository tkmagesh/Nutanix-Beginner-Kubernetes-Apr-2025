# Kubectl Cheatsheet

## Basic Info
```bash
kubectl version                        # Show kubectl and cluster version
kubectl config view                    # Show kubeconfig details
kubectl cluster-info                   # Show cluster info
kubectl get all                        # Show all resources in current namespace
kubectl get nodes                      # List all cluster nodes
```

---

## Workloads (Pods, Deployments, etc.)
```bash
kubectl get pods                       # List all pods
kubectl get deployments                # List all deployments
kubectl describe pod <pod-name>        # Detailed info about a pod
kubectl logs <pod-name>                # View pod logs
kubectl logs <pod-name> -c <container> # Logs from specific container
kubectl exec -it <pod-name> -- bash    # Exec into pod
kubectl delete pod <pod-name>          # Delete a pod
```

---

##  Deployments
```bash
kubectl create deployment <name> --image=<image>   # Create a deployment
kubectl scale deployment <name> --replicas=3       # Scale deployment
kubectl rollout status deployment <name>           # Check rollout status
kubectl rollout undo deployment <name>             # Rollback deployment
```

---

##  Services & Networking
```bash
kubectl get svc                          # List services
kubectl expose deployment <name> --type=LoadBalancer --port=80  # Create service
kubectl port-forward <pod> 8080:80       # Forward port to local
```

---

##  Configuration (ConfigMaps, Secrets)
```bash
kubectl get configmaps                   # List ConfigMaps
kubectl create configmap my-config --from-literal=key=value
kubectl get secrets                      # List secrets
kubectl create secret generic my-secret --from-literal=password=1234
```

---

##  Apply/Manage Resources
```bash
kubectl apply -f <file.yaml>             # Apply config
kubectl delete -f <file.yaml>            # Delete resources from file
kubectl get -f <file.yaml>               # Get resources defined in file
```

---

##  Namespaces
```bash
kubectl get namespaces
kubectl create namespace <name>
kubectl delete namespace <name>
kubectl config set-context --current --namespace=<name>
```

---

##  Resource Shortcuts
| Resource     | Shortcut |
|--------------|----------|
| pod          | po       |
| service      | svc      |
| deployment   | deploy   |
| configmap    | cm       |
| secret       | sec      |
| namespace    | ns       |

