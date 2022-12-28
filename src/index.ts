import "dotenv/config"
import { Express } from "./config/express"

function bootstrap() {
  const PORT = process.env.PORT || 3000

  new Express().listen(3000, () =>
    console.info(`Application running on ${PORT}`)
  )
}

bootstrap()
