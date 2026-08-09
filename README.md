# Workshop with NodeJS + PostgreSQL + Docker
* API with NodeJS + Express + PostgreSQL
* API testing with Jest + Supertest
* Working with Docker and Docker Compose
  * Write Dockerfile for NodeJS application
  * Write docker-compose.yml for NodeJS application and PostgreSQL database

## Working with NodeJS + Express + PostgreSQL
```
$cd api

// Start database and check data
$docker compose up -d db
$docker compose ps 
$docker compose exec -it db bash
$psql -U postgres -d employees
List of tables => \dt
Select data from employees table => SELECT * FROM employees;

// Start the application
$npm install
$npm test


$export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/employees
$npm start
```

## API Testing with Postman and [newman](https://www.npmjs.com/package/newman)
```
$cd api-testing
$npm install -g newman
$newman run nodejs-api.postman_collection.json
```

## Working with Docker and Docker Compose
* Build and run the application with Docker Compose

```
$cd api
$docker compose up --build
$docker compose ps
```

## Design and build pipeline with GitHub Actions
1. Trigger pipeline on push to main branch
2. Run tests with NodeJS and Jest with `npm test`
3. Build and test the application with NodeJS
   3.1 Build docker images  with docker compose (api and db), keep to cache
   3.2 Push docker images to DockerHub
4. Deploy to production server with SSH and docker compose

## Deploy with Kubernetes with [miniKube](https://minikube.sigs.k8s.io/docs/start/)
1. Install miniKube and [kubectl](https://minikube.sigs.k8s.io/docs/handbook/kubectl/)
2. Start miniKube with `minikube start`
3. Check the cluster with `kubectl get nodes`

Start miniKube with docker driver and 4GB memory
```
$minikube start --driver=docker --memory=4096
$minikube status
$minikube dashboard 
```


