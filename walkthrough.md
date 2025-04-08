# Using Minikube

## Create a cluster
```shell
minikube start [--driver=<driver>]
# Ex:
minikube start
minikube start --driver=hyperkit
```

## Get cluster status
```shell
minikube status
```

## Delete a cluster
```shell
minikube delete
```

## Login to the node
```shell
minikube ssh
```

# Kubectl
## Get cluster info
```shell
kubectl cluster-info
```

## Get the nodes
```shell
kubectl get nodes
```

## Get the pods
```shell
kubectl get pods
kubectl get pods -o wide
```

## Get the namespaces
```shell
kubectl get namespaces
```

## List the pods in a namespace
```shell
kubectl get pods --namespace=<name_of_namespace>
# OR
kubectl get pods --namespace=kube-system
# OR
kubectl get pods -n=kube-system
```

## Deploy a pod directly
```shell
kubectl run nginx-pod --image=nginx
kubectl get pods
```

## Delete a pod
```shell
kubectl delete pod ngnix-pod
```

## Get info about a pod
```shell
kubectl describe pod nginx-pod
```