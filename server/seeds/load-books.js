const fs = require('fs');

exports.seed = function(knex) {
  const contents = fs.readFileSync(__dirname + '/Data/booksSampleData.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Books')
    .del()
    .then(() => knex.batchInsert('Books', data, 100));
};
