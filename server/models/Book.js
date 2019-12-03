const { Model } = require('objection');

class Book extends Model {
  static get tableName() {
    return 'Books';
  }

  static get idColumn() {
    return 'ISBN';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        id: { type: 'integer' },
        ISBN: { type: 'string' },
        courseID: { type: 'string' },
        title: { type: 'string' }
      }
    };
  }
}

module.exports = Book;
