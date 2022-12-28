import express, { Application } from "express"

class Express {
  private app = express()

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
  }

  public listen(...args: Parameters<Application["listen"]>) {
    this.app.listen(...args)
  }
}

export { Express }
