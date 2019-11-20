const path = require('path');
const fs = require('fs');

exports.seed = knex => {
  const contents = fs.readFileSync(
    path.join(__dirname, '/Clean Sample Data/classSampleData.json')
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Classes')
    .del()
    .then(() => knex.batchInsert('Classes', data, 100));
};
