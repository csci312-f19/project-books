const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['googleId'],

      properties: {
        id: { type: 'increments' },
        googleId: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' }
      }
    };
  }
}

module.exports = User;
