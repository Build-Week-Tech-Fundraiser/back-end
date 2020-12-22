
exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
      table.increments()
      table.string('username', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('firstname', 255).notNullable()
      table.string('lastname', 255).notNullable()
  })
  .createTable('projects', table => {
      table.increments()
      table.string('title', 255).notNullable()
      table.integer('host').notNullable().unsigned()
        .references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE')
      table.string('description').notNullable()
  })
  .createTable('project_funders', table => {
      table.increments()
      table.integer('user_id').notNullable().unsigned()
        .references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('project_id').notNullable().unsigned()
        .references('id').inTable('projects')
        .onDelete('CASCADE').onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('project_funders')
  .dropTableIfExists('projects')
  .dropTableIfExists('users')
};
