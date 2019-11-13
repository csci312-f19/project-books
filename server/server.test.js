const request = require('supertest');
const { app, knex } = require('./server');

const book = {
  ISBN: '978-0-520-28773-0',
  courseID: 'AMST 0400A',
  title: "American Studies: A User's Guide"
};

describe('Midd Book Market API', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  test('GET /api/listings should return all listings', () => {
    return request(app)
      .get('/api/listings')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([Object.assign({ id: 1 }, book)]);
  });
});

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('dotenv configured', () => {
  expect(process.env.MY_SECRET).toBeDefined();
});
