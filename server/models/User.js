const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required : [nothing yet]

      properties: {
        user_id: { type: 'increments' },
        email: { type: 'string' },
        last_name: { type: 'string' },
        first_name: { type: 'string' }
      }
    };
  }
}

module.exports = User;
