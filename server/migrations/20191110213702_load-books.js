exports.up = knex => {
  return knex.schema.createTable('Books', table => {
    table.increments('id').primary();
    table.string('ISBN');
    table.string('title');
    //   table.string('author');
    //   table.string('publisher');
    table.string('courseID');

    // insert further constraints such as not nullable
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Books');
};
