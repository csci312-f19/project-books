const { Model } = require('objection');

class Book extends Model {
  static get tableName() {
    return 'Books';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        ISBN: { type: 'string' },
        courseID: { type: 'string' },
        title: { type: 'string' }
      }
    };
  }
}

module.exports = Book;