/* eslint-disable no-console */
const tableName = "nominations";
/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName);

  if(!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (t) => {
      t.bigIncrements("id");
      t.bigInteger("userId")
        .notNullable()
        .index()
        .unsigned()
        .references("users.id")
      t.uuid("topicId")
        .notNullable()
        .index()
        .unsigned()
        .references("topics.id")
      t.string("memeData")
        .notNullable()
      t.string("memeUrl")
      t.smallint("numberVotes")
      t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
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