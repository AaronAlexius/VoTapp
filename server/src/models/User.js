/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");
const Nomination = require("./Nomination");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "userName"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "userName"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        userName: { type: "string", minLength: 3, maxLength: 12 }
      },
    };
  }

  static get relationMappings() {
    const { Topic, Room, Nomination } = require("./index.js")
    return {
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: Topic,
        join: {
          from: "users.id",
          through: {
            from: "rooms.userId",
            to: "rooms.topicId"
          },
          to: "topics.userId"
        }
      },
      nominations: {
        relation: Model.HasManyRelation,
        modelClass: Nomination,
        join: {
          from: "users.id",
          to: "nominations.userId"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;