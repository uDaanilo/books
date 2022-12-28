import { dbConnection } from "../../src/config/db"
import request from "supertest"
import { Express } from "../../src/config/express"
import { Book, BookSchema } from "../../src/models/book"
import { faker } from "@faker-js/faker"
import { BookFactory } from "../helpers/factories"

const app = new Express().app

describe("Books", () => {
  beforeAll(async () => {
    await dbConnection.initialize()
  })

  afterEach(async () => {
    await Book.clear()
  })

  it("GET / should list all books with pagination", async () => {
    await BookFactory({ stock: 10 }, 11)

    let page = 1

    const firstReponse = await request(app).get(`/books?page=${page}`)

    expect(firstReponse.statusCode).toBe(200)
    expect(Array.isArray(firstReponse.body)).toBeTruthy()

    page += 1
    const secondReponse = await request(app).get(`/books?page=${page}`)

    expect(secondReponse.statusCode).toBe(200)
    expect(Array.isArray(secondReponse.body)).toBeTruthy()
    expect(secondReponse.body.length).toBe(1)
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

  it("POST / should not create a new book with invalid properties", async () => {
    const mockBook = {
      name: 1,
      description: faker.lorem.paragraph(),
      author: faker.name.fullName(),
      sbn: Book.generateSbn(),
      stock: "lorem ipsum",
    }

    const response = await request(app).post("/books").send(mockBook)

    expect(response.statusCode).toBe(400)
  })

  afterAll(async () => {
    await dbConnection.dropDatabase()
  })
})
