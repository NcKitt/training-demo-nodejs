const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmployee(employee) {
  if (!employee || typeof employee !== 'object' || Array.isArray(employee)) {
    return false;
  }

  const { name, email, position } = employee;

  return (
    typeof name === 'string' &&
    name.trim().length > 0 &&
    typeof email === 'string' &&
    EMAIL_PATTERN.test(email.trim()) &&
    typeof position === 'string' &&
    position.trim().length > 0
  );
}

module.exports = { validateEmployee };