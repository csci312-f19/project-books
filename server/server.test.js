const request = require('supertest');
const { app, knex } = require('./server');

const listing = {
  userID: 11,
  ISBN: '123-4-567-890123',
  condition: 'Excellent',
  price: 100,
  edited: '11/17/19',
  comments: 'This is the best book ever'
};

const book = {
  ISBN: '123-4-567-890123',
  courseID: 'CSCI 312',
  title: 'Agile 101'
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
  // GET TESTS
  test('GET /api/listings should return all listings', () => {
    return request(app)
      .get('/api/listings')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([Object.assign({ listingID: 1 }, listing)]);
  });

  test('GET /api/bookListings returns listing and book objects with same ISBN', () => {
    return request(app)
      .get('/api/bookListings')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([Object.assign({ listingID: 1 }, listing, book)]);
  });

  test('GET /api/bookListings/:id returns listing and book objects with same ISBN by listingID', () => {
    return request(app)
      .get('/api/bookListings/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([Object.assign({ listingID: 1 }, listing, book)]);
  });
});

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('dotenv configured', () => {
  expect(process.env.MY_SECRET).toBeDefined();
});
