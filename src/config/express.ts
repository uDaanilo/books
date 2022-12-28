import { errors } from "celebrate"
import express from "express"
import routes from "./routes"

class Express {
  public app = express()

  constructor() {
    this.setConfig()
    this.setRoutes()
    this.errorHandlers()
  }

  private setConfig() {
    this.app.use(express.json())
  }

  private setRoutes() {
    this.app.all("/", (req, res) => {
      res.send("Hello world")
    })
    this.app.use(routes)
  }

  private errorHandlers() {
    this.app.use(errors({ statusCode: 400 }))
  }
}

export { Express }
