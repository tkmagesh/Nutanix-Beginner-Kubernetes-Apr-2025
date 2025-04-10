#!/bin/bash

set -e

# echo "🔧 Setting up local Docker environment for Minikube..."
# eval $(minikube docker-env)

echo "Building Docker image for Node.js app..."

# update the following for your repo
docker build -t tkmagesh/node-pg-app:2.0.0 .
docker push tkmagesh/node-pg-app:2.0.0

echo "Applying Kubernetes resources..."
kubectl apply -f k8s/01-postgres-secret.yaml
kubectl apply -f k8s/02-postgres-configmap.yaml
kubectl apply -f k8s/03-postgres-statefulset.yaml
kubectl apply -f k8s/04-postgres-service.yaml


# Wait for PostgreSQL pod to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=120s

kubectl apply -f k8s/05-app-deployment.yaml
kubectl apply -f k8s/06-app-service.yaml
kubectl apply -f k8s/07-postgres-external-service.yaml

echo "Deployment complete!"
# minikube service node-app-service
