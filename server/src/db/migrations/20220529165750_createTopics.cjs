/* eslint-disable no-console */
const tableName = "topics";
/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName)

  if(!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (t) => {
      t.uuid("id")
        .primary()
      t.string("topicText")
        .notNullable()
      t.string("roomUrl")
        .notNullable()
    })
  }
}
/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log(`Rolling back ${tableName}`)
  return knex.schema.dropTableIfExists(tableName)
}