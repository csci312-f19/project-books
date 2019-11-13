exports.up = knex => {
  return knex.schema.createTable('Users', table => {
    table.increments('userID');
    table.string('email');
    table.string('name');
    // insert further constraints such as not nullable
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Users');
};
