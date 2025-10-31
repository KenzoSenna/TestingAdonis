import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description', 'longtext').nullable()
      table.boolean('done').nullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}