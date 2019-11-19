exports.up = knex => {
  return knex.schema.createTable('Transactions', table => {
    table.integer('listingID');
    table.string('status');

    // insert further constraints such as not nullable
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Transactions');
};
