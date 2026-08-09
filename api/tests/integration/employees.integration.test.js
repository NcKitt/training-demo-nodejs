const request = require('supertest');
const { createApp } = require('../../src/app');

describe('POST /api/employees', () => {
  let pool;
  let app;

  beforeEach(() => {
    pool = { query: jest.fn() };
    app = createApp(pool);
  });

  it('creates and returns an employee', async () => {
    const employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
    };
    pool.query.mockResolvedValue({ rows: [employee] });

    const response = await request(app)
      .post('/api/employees')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(employee);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO employees'), [
      'John Doe',
      'john.doe@example.com',
      'Software Engineer',
    ]);
  });

  it.each([
    [{ email: 'john.doe@example.com', position: 'Software Engineer' }],
    [{ name: '', email: 'john.doe@example.com', position: 'Software Engineer' }],
    [{ name: 'John Doe', email: 'invalid', position: 'Software Engineer' }],
    [{ name: 'John Doe', email: 'john.doe@example.com', position: '   ' }],
  ])('rejects an invalid request body', async (body) => {
    const response = await request(app).post('/api/employees').send(body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid request body' });
    expect(pool.query).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('Content-Type', 'application/json')
      .send('{"name":');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid request body' });
    expect(pool.query).not.toHaveBeenCalled();
  });

  it('returns 500 when the database fails', async () => {
    pool.query.mockRejectedValue(new Error('database unavailable'));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await request(app)
      .post('/api/employees')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
    console.error.mockRestore();
  });
});