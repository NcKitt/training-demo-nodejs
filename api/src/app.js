const express = require('express');
const pool = require('./config/db.config');
const createEmployeesRouter = require('./employees/employees.routes');
const errorMiddleware = require('./middlewares/error.middleware');

function createApp(databasePool = pool) {
  const app = express();
  // test2
  // test3
  app.use(express.json());
  app.use('/api/employees', createEmployeesRouter(databasePool));
  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };