const { validateEmployee } = require('../utils/validation.util');

class InvalidEmployeeError extends Error {}

class EmployeesService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(employee) {
    if (!validateEmployee(employee)) {
      throw new InvalidEmployeeError('Invalid request body');
    }

    return this.repository.create({
      name: employee.name.trim(),
      email: employee.email.trim(),
      position: employee.position.trim(),
    });
  }
}

module.exports = { EmployeesService, InvalidEmployeeError };