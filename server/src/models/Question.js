const Model = require("./Model.js");

class Question extends Model {
  static get tableName() {
    return "questions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["topic", "boxes"],
      properties: {
        topic: { type: "string" },
        boxes: { type: ["integer", "string"]},
        image: { type: "string" },
        userId: { type: "string" }
      }
    }
  }

  static get relationalMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "topics.id",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Question