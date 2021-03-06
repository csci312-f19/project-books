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
          ISBN: '123-4-567-890123',
          courseID: 'CSCI 312',
          title: 'Agile 101'
        }
      ])
    );
};
