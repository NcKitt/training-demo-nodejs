class EmployeesController {
  constructor(service) {
    this.service = service;
  }

  create = async (request, response, next) => {
    try {
      const employee = await this.service.create(request.body);
      response.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = EmployeesController;