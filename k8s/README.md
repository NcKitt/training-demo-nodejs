# Run the Application in Kubernetes

## Prerequisites

- A running Kubernetes cluster
- `kubectl` configured for the cluster
- A default StorageClass for the PostgreSQL PVC

Check the cluster and storage:

```sh
kubectl cluster-info
kubectl get storageclass
```

## Enable Metrics Server

HPA requires [Metrics Server](https://github.com/kubernetes-sigs/metrics-server/) to read pod CPU usage.

For Minikube:

```sh
minikube addons enable metrics-server
```

For a standard Kubernetes cluster:

```sh
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

// Edit --kubelet-insecure-tls in ags
$kubectl edit deployment metrics-server -n kube-system


kubectl get po -n kube-system -w
```

Wait until metrics are available:

```sh
kubectl rollout status deployment/metrics-server -n kube-system
kubectl top nodes
```

## Deploy the API and Database

From the repository root:

```sh
kubectl apply -f k8s/
kubectl rollout status deployment/employees-db
kubectl rollout status deployment/employees-api

kubectl get po 
kubectl get deployment
```

Check the resources:

```sh
kubectl get pods,services,pvc
kubectl get hpa employees-api
kubectl top pods
```

The API HPA maintains 2 to 5 API replicas and scales when average CPU usage
exceeds 70% of the API container's CPU request.

## Access the API

Forward the API Service to the local machine:

```sh
kubectl port-forward service/employees-api 3000:3000
```

The API is available at `http://localhost:3000/api/employees`.

## Test Autoscaling

In another terminal, create a temporary load generator:

```sh
kubectl run api-load --image=busybox:1.36 --restart=Never -- /bin/sh -c \
	'while true; do wget -q -O- http://employees-api:3000/api/employees > /dev/null; done'
```

Watch the API HPA and pods:

```sh
kubectl get hpa employees-api --watch
kubectl get pods --watch
```

Stop the load test:

```sh
kubectl delete pod api-load
```

The HPA scales the API back toward two replicas after CPU usage decreases and
the default stabilization period expires.

## Database Scaling

The PostgreSQL Deployment intentionally runs one replica. Do not add an HPA to
this database Deployment: all replicas would use the same `ReadWriteOnce` PVC,
and PostgreSQL replication is not configured.

For a horizontally scalable production database, replace the Deployment with
a PostgreSQL operator or managed PostgreSQL service that supports replication,
failover, and per-instance persistent volumes.

## Remove the Application

```sh
kubectl delete -f k8s/
```