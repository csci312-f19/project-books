exports.up = function(knex) {
  return knex.schema.createTable('Listings', table => {
    table.increments('listingID');
    table.integer('userID');
    table.string('ISBN');
    table.string('condition');
    table.decimal('price');
    table.string('edited');
    table.text('comments');
    //insert further constraints such as not nullable
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Listings');
};
