import { dbConnection } from "../../src/config/db"
import request from "supertest"
import { Express } from "../../src/config/express"
import { Book, BookSchema } from "../../src/models/book"
import { faker } from "@faker-js/faker"

const app = new Express().app

describe("Books", () => {
  beforeAll(async () => {
    await dbConnection.initialize()
  })

  it("POST / should create a new book", async () => {
    const mockBook: BookSchema = {
      name: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      author: faker.name.fullName(),
      sbn: Book.generateSbn(),
      stock: 3,
    }

    const response = await request(app).post("/books").send(mockBook)

    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBeDefined()
  })

  afterAll(async () => {
    await dbConnection.dropDatabase()
  })
})
