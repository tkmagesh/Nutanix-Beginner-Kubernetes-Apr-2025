

## Minikube

### Start a Cluster
```bash
minikube start
```

- Start with specific driver:
```bash
minikube start --driver=docker
# OR
minikube start --driver=hyperkit
```

- Start with specific Kubernetes version:
```bash
minikube start --kubernetes-version=v1.27.0
```

---

##  Basic Cluster Management

### Stop / Delete Cluster
```bash
minikube stop
minikube delete
```

### Pause / Unpause Cluster
```bash
minikube pause
minikube unpause
```

### Restart Cluster
```bash
minikube stop && minikube start
```

---

##  Networking

### Access Services via Browser
```bash
minikube service <service-name>
```

### Get Service URL
```bash
minikube service <service-name> --url
```


---

## Dashboard

### Open Kubernetes Dashboard
```bash
minikube dashboard
```

---

##  Configuration & Info

### View Cluster Status
```bash
minikube status
```

### View IP Address
```bash
minikube ip
```

### Set Config
```bash
minikube config set memory 4096
minikube config set cpus 2
```

---

##  Addons

### List Available Addons
```bash
minikube addons list
```

### Enable/Disable Addons
```bash
minikube addons enable <addon-name>
minikube addons disable <addon-name>
```

Example:
```bash
minikube addons enable ingress
```

---

##  Advanced Usage

### SSH into Minikube Node
```bash
minikube ssh
```
---


