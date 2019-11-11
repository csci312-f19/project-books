const fs = require('fs');

exports.seed = function(knex) {
  const contents = fs.readFileSync(__dirname + '/Data/usersSampleData.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(() => knex.batchInsert('Users', data, 100));
};
