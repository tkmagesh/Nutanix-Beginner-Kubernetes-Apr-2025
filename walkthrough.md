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

# Deployment

## Create and manage deployment for an image
```shell
kubectl create deployment nginx-deployment --image=nginx

kubectl get deployments

kubectl describe deployment nginx-deployment

kubectl get pods

kubectl delete deployment nginx-deployment
```

## Scale the deployment
```shell
kubectl create deployment nginx-deployment --image=nginx
kubectl scale deployment nginx-deployment --replicas=3
```

# Service
## Exposing a Pod using a "Service" (type=NodePort)
```shell
kubectl get services

# Make sure the nginx pod is created
kubectl get pods

# --port = <container-port>
kubectl expose pod nginx-pod --type=NodePort --port=80 --name=nginx-pod-svc

# 
kubectl describe service nginx-pod-svc

# Get the URL
minikube service nginx-pod --url

# Delete
minikube delete service nginx-pod-svc
```



