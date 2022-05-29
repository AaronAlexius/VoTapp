const Model = require("./Model.js")
const Nomination = require("./Nomination.js")

class Room extends Model {
  static get tableName() {
    return "rooms"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "topicId"],
      properties: {
        userId: { type: ["integer", "string"] },
        topicId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User, Topic } = require("./index.js")

    return {
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Topic,
        join: {
          from: "rooms.topicId",
          to: "topics.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "rooms.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Room