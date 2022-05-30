const Model = require("./Model.js");

class Topic extends Model {
  static get tableName() {
    return "topics"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["topicText"], 
      properties: {
        topicText: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, Nomination, Room } = require("./index.js")

    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "topics.id",
          through: {
            from: "rooms.topicId",
            to: "rooms.userId"
          },
          to: "users.id"
        }
      },
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: "topics.id",
          to: "rooms.topicId"
        }
      },
      nomination: {
        relation: Model.HasManyRelation,
        modelClass: Nomination,
        join: {
          from: "topics.id",
          to: "nominations.topicId"
        }
      }
    }
  }
}

module.exports = Topic