import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "../models/book"

const shouldSync =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"

const database =
  process.env.NODE_ENV === "test"
    ? "book_application_test.sqlite"
    : "books_application.sqlite"

const dbConnection = new DataSource({
  type: "sqlite",
  database: `./src/db/${database}`,
  entities: [Book],
  synchronize: shouldSync,
})

export { dbConnection }
