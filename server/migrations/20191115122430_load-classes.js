exports.up = knex => {
  return knex.schema.createTable('Classes', table => {
    table.string('courseCode');
    table.string('courseTitle');
    table.string('department');

    // insert further constraints such as not nullable
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Classes');
};
