const path = require('path');
const fs = require('fs');

exports.seed = knex => {
  const contents = fs.readFileSync(
    path.join(__dirname, '/DB_data/booksSampleData.json')
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Books')
    .del()
    .then(() => knex.batchInsert('Books', data, 100));
};
