const { Model } = require('objection');

class Listing extends Model {
  static get tableName() {
    return 'Listings';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        id: { type: 'increments' },
        userID: { type: 'integer' },
        ISBN: { type: 'string' },
        condition: { type: 'integer' },
        price: { type: 'decimal' },
        edited: { type: 'string' },
        comments: { type: 'text' }
      }
    };
  }
}

module.exports = Listing;
