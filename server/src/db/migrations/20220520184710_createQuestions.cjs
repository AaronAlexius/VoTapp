const tableName = "questions";
/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName)

  if(tableExists) {
    console.log(`${tableName} already exists, skipping`)
    return
  }

  return knex.schema.createTable(tableName, (t) => {
    t.bigIncrements("id")
    t.string("topic").notNullable()
    t.bigInteger("userId")
      .notNullable()
      .index()
      .unsigned()
      .references("users.id")
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log(`Rolling back ${tableName}`)
  return knex.schema.dropTableIfExists(tableName)
};