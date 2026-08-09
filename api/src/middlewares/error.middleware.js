const { InvalidEmployeeError } = require('../employees/employees.service');

function errorMiddleware(error, request, response, next) {
  const isMalformedJson =
    error instanceof SyntaxError && error.status === 400 && Object.hasOwn(error, 'body');

  if (error instanceof InvalidEmployeeError || isMalformedJson) {
    return response.status(400).json({ error: 'Invalid request body' });
  }

  console.error(error);
  return response.status(500).json({ error: 'Internal server error' });
}

module.exports = errorMiddleware;