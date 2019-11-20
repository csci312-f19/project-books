const path = require('path');
const fs = require('fs');

exports.seed = knex => {
  const contents = fs.readFileSync(
    path.join(__dirname, '/Clean Sample Data/usersSampleDataNew.json')
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(() => knex.batchInsert('Users', data, 100));
};
