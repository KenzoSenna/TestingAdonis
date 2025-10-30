import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
      mysql: {
      client: 'mysql2',
      connection: {
        host: app.config.get('database.host'),
        port: app.config.get('database.port'),
        user: app.config.get('database.user'),
        password: app.config.get('database.password'),
        database: app.config.get('database.database'),
      },
    },
  },
})

export default dbConfig