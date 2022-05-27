const Model = require("./Model.js");

class Question extends Model {
  static get tableName() {
    return "questions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["topic"],
      properties: {
        topic: { type: "string" },
        userId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "questions.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Question