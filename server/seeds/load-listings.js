const path = require('path');
const fs = require('fs');

exports.seed = knex => {
  const contents = fs.readFileSync(
    path.join(__dirname, '/Clean Sample Data/listingsSampleData.json')
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Listings')
    .del()
    .then(() => knex.batchInsert('Listings', data, 100));
};
