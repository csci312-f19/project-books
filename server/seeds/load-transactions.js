const path = require('path');
const fs = require('fs');

exports.seed = knex => {
  const contents = fs.readFileSync(
    path.join(__dirname, '/Clean Sample Data/transactionsSampleData.json')
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  return knex('Transactions')
    .del()
    .then(() => knex.batchInsert('Transactions', data, 100));
};
