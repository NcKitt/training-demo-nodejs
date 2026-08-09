const express = require('express');
const EmployeesController = require('./employees.controller');
const EmployeesRepository = require('./employees.repository');
const { EmployeesService } = require('./employees.service');

function createEmployeesRouter(pool) {
  const repository = new EmployeesRepository(pool);
  const service = new EmployeesService(repository);
  const controller = new EmployeesController(service);
  const router = express.Router();

  router.post('/', controller.create);

  return router;
}

module.exports = createEmployeesRouter;