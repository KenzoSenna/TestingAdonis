import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
        await User.createMany([
      {
        name: 'Kenzo de Oliveira Senna',
        email: 'kenzoteste@gmail.com',
        password: 'bait123',
      },
      {
        name: 'Onamae Wa',
        email: 'moushindeiru@gmail.com',
        password: 'nani123',
      }
    ])
  }
} 