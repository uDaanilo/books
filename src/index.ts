import "dotenv/config"
import "reflect-metadata"
import { dbConnection } from "./config/db"
import { Express } from "./config/express"

async function bootstrap() {
  const PORT = process.env.PORT || 3000

  await dbConnection.initialize()

  new Express().listen(3000, () =>
    console.info(`Application running on ${PORT}`)
  )
}

bootstrap()
