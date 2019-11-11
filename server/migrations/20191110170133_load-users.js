exports.up = function(knex) {
  return knex.schema.createTable('Users', table => {
    table.increments('user_id');
    table.string('email');
    table.string('name');
    //insert further constraints such as not nullable
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users');
};
