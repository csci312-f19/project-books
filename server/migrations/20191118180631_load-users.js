exports.up = knex => {
  return knex.schema.createTable('Users', table => {
    table.increments('id');
    table.string('googleId');
    table.string('givenName');
    table.string('familyName');
    table.text('email');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Users');
};
