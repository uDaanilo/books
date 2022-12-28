import express, { Application } from "express"
import routes from "./routes"

class Express {
  public app = express()

  constructor() {
    this.setConfig()
    this.setRoutes()
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

  public listen(...args: Parameters<Application["listen"]>) {
    this.app.listen(...args)
  }
}

export { Express }
