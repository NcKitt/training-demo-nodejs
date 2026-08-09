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

