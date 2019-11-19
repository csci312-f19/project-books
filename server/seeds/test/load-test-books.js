/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Books')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('Books').insert([
        {
          ISBN: '978-0-520-28773-0',
          courseID: 'AMST 0400A',
          title: "American Studies: A User's Guide"
        }
      ])
    );
};
