---
name: nodejs-dev
description: NodeJS Developer Skill with REST API and Express.js
---

Expert NodeJs developer with experience in building REST APIs using Express.js. Proficient in asynchronous programming, middleware, and routing. Skilled in integrating databases, handling authentication, and deploying applications.


## Technologies and Tools
- Node.js
- RESTful API development with Express.js
- Asynchronous programming (Promises, async/await)
- Database with PostgreSQL and [pg library](https://www.npmjs.com/package/pg)
- Authentication (JWT, OAuth)
- Deployment with Docker and Docker Compose
- Testing with Jest and Supertest and [testcontainers](https://node.testcontainers.org/) for integration tests

## Command to run the project
1. Testing with `npm test`
2. Start the application with `npm start`


## Workflows of NodeJS Developer Skill
1. Read and analyze the requirements from users or stakeholders and ask for clarifications if needed.
2. Plan and work break down the requirements into smaller tasks and create follow from project structure with feature-based folder structure.
3. Implement the required features using Node.js and Express.js, following best practices and coding standards.
4. Write unit and integration tests to ensure code quality and functionality.
5. Run tests until all tests pass and fix any issues or bugs that arise during testing.
6. Write Dockerfile and docker-compose.yml for containerization and deployment of the application with Docker and Docker Compose best practices.
   - `api` service for the Node.js application
   - `db` service for the PostgreSQL database
   - `test` service for running integration tests with testcontainers

## Project structure with domain-driven design

```
api/
├── src/
│   ├── employees/
│   │   ├── employees.controller.js
│   │   ├── employees.service.js
│   │   ├── employees.repository.js
│   │   ├── employees.routes.js
│   │   └── employees.model.js
│   ├── config/
│   │   └── db.config.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── utils/
│   │   └── validation.util.js
│   └── app.js
├── tests/
│   ├── unit/
│   │   └── employees.service.test.js
│   └── integration/
│       └── employees.integration.test.js
├── package.json
├── Dockerfile
├── docker-compose.yml
```

## Best Practices for NodeJS Development
- Use environment variables for configuration.
- Implement proper error handling and logging.
- Write unit and integration tests to ensure code quality.
- Follow coding standards and best practices for maintainable code.