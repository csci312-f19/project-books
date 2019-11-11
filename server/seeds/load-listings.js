const fs = require('fs');

exports.seed = function(knex) {
  const contents = fs.readFileSync(__dirname + '/Data/listingsSampleData.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Listings')
    .del()
    .then(() => knex.batchInsert('Listings', data, 100));
};
