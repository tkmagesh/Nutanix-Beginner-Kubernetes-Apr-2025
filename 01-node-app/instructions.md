# Create a deployment for tkmagesh/node-app:1.0.0 (replica=1)

# Scale the deployment for 3 replicas

# Create a service to expose the application

# Test the service

# Upgrade the deployment for the new version of the app (tkmagesh/node-app:2.0.0)
```shell
kubectl set image deployment <deployment-name> <container-name>=tkmagesh/node-app:2.0.0

# get the container name by "describing the deployment"
```

# Test the service