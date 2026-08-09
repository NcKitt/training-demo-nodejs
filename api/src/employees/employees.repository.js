class EmployeesRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async create({ name, email, position }) {
    const result = await this.pool.query(
      `INSERT INTO employees (name, email, position)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, position`,
      [name, email, position],
    );

    return result.rows[0];
  }
}

module.exports = EmployeesRepository;