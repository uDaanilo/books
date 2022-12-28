import { DataSource } from "typeorm"
import path from "path"

const dbConnection = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "..", "db", "books_application.sqlite"),
  entities: [],
  synchronize: process.env.NODE_ENV === "development",
})

export { dbConnection }
