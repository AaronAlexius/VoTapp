const Model = require("./Model.js");

class Nomination extends Model {
  static get tableName() {
    return "nominations"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "topicId", "memeUrl"],
      properties: {
        userId: { type: ["integer", "string"] },
        topicId: { type: ["integer", "string"] },
        memeUrl: { type: "string", pattern: "^https?:\/\/i.imgflip.com\/(.+)(\.(jpg))$" },
        numberVotes: { type: ["integer", "string"] }
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