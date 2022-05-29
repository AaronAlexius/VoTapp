const Model = require("./Model.js");

class Nomination extends Model {
  static get tableName() {
    return "nominations"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "topicId", "memeData"],
      properties: {
        userId: { text: ["integer", "string"] },
        topicId: { text: ["integer", "string"] },
        memeData: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, Topic } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "nominations.userId",
          to: "users.id"
        }
      },
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Topic,
        join: {
          from: "nominations.topicId",
          to: "topics.id"
        }
      }
    }
  }
}

module.exports = Nomination