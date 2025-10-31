import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'

export default class extends BaseSeeder {
  async run() {

    await Task.createMany([
      {
        title: 'MIT wake up to reality',
        description: 'Literalmente o que a task diz',
        done: false,
        userId: 2
      }
    ])
  }
}