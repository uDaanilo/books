import { errors } from "celebrate"
import express, { NextFunction, Request, Response } from "express"
import routes from "./routes"
import swaggerUi from "swagger-ui-express"
import docs from "../../swagger.json"

class Express {
  public app = express()

  constructor() {
    this.setConfig()
    this.setRoutes()
    this.errorHandlers()
  }

  private setConfig() {
    this.app.use(express.json())
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs))
  }

  private setRoutes() {
    this.app.all("/", (req, res) => {
      res.send("Hello world")
    })
    this.app.use(routes)
  }

  private errorHandlers() {
    this.app.use(errors({ statusCode: 400 }))
    this.app.use(
      (err: unknown, req: Request, res: Response, next: NextFunction) => {
        if (err) console.error(err)

        res.sendStatus(500)
      }
    )
  }
}

export { Express }
