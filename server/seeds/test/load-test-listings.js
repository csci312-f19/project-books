/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Listings')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('Listings').insert([
        {
          userID: 11,
          ISBN: '123-4-567-890123',
          condition: 'Excellent',
          price: 100,
          edited: '11/17/19',
          comments: 'This is the best book ever'
        }
      ])
    );
};
