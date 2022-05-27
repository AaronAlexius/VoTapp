const Model = require(".Model.js");

class Memes extends Model {
  static get tableName() {
    return "memes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        template_id : { text: "string" },
        url: { text: "string" },

      }
    }
  }
}