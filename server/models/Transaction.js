const { Model } = require('objection');

class Transaction extends Model {
  static get tableName() {
    return 'Transactions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        listingID: { type: 'integer' },
        status: { type: 'string' }
      }
    };
  }
}

module.exports = Transaction;
