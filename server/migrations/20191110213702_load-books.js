exports.up = function(knex) {
  return knex.schema.createTable('Books', table => {
    table.string('ISBN');
    table.string('title');
    //   table.string('author');
    //   table.string('publisher');
    table.string('courseID');

    //insert further constraints such as not nullable
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Books');
};
