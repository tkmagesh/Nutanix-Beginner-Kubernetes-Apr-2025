## Deploy the resources
```shell
kubectl apply -f k8s/.
```

## Get the PV
```shell
kubectl get pv
```

## Get info about PV
```shell
kubectl get pv <pv-name> -o yaml
# look for hostpath/path
 ```


