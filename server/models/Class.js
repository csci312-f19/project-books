const { Model } = require('objection');

class Class extends Model {
  static get tableName() {
    return 'Classes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        courseCode: { type: 'string' },
        courseTitle: { type: 'string' },
        department: { type: 'string' }
      }
    };
  }
}

module.exports = Class;
