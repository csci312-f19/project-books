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
        id: { type: 'integer' },
        googleId: { type: 'string' },
        givenName: { type: 'string' },
        familyName: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }
}

module.exports = User;

// /* eslint-disable camelcase */
// const { Model } = require('objection');

// class User extends Model {
//   // Table name is the only required property.
//   static get tableName() {
//     return 'Users';
//   }

//   // Objection.js assumes primary key is `id` by default

//   static get jsonSchema() {
//     return {
//       type: 'object',
//       required: ['googleId'],

//       properties: {
//         id: { type: 'integer' },
//         googleId: { type: 'string' },
//         givenName: { type: 'string' },
//         familyName: { type: 'string' },
//         email: { type: 'string' }
//       }
//     };
//   }
// }

// module.exports = User;
