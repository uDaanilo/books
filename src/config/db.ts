import { DataSource } from "typeorm"
import path from "path"
import { Book } from "../models/book"

const dbConnection = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "..", "db", "books_application.sqlite"),
  entities: [Book],
  synchronize: process.env.NODE_ENV === "development",
})

export { dbConnection }
