const { app } = require('./server');

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('dotenv configured', () => {
  expect(process.env.MY_SECRET).toBeDefined();
});
