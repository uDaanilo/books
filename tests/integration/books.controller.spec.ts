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

  it("GET /:id should return all book properties", async () => {
    const [book] = await BookFactory(undefined, 1)

    const response = await request(app).get(`/books/${book.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(book.id)
    expect(response.body.name).toBe(book.name)
    expect(response.body.author).toBe(book.author)
    expect(response.body.description).toBe(book.description)
    expect(response.body.sbn).toBe(book.sbn)
    expect(response.body.stock).toBe(book.stock)
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

  it("POST / should not create a new book with invalid sbn", async () => {
    const mockBook = {
      name: "test",
      description: faker.lorem.paragraph(),
      author: faker.name.fullName(),
      sbn: "random sbn",
      stock: 2,
    }

    const response = await request(app).post("/books").send(mockBook)

    expect(response.statusCode).toBe(400)
  })

  it("PATCH /:id should be able to update a book", async () => {
    const [book] = await BookFactory(undefined, 1)
    const newName = "Updated"

    const response = await request(app).patch(`/books/${book.id}`).send({
      name: newName,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(newName)
  })

  it("PATCH /:id should not be able to update a book with invalid properties", async () => {
    const [book] = await BookFactory(undefined, 1)
    const newName = 2

    const response = await request(app).patch(`/books/${book.id}`).send({
      name: newName,
    })

    expect(response.statusCode).toBe(400)
  })

  it("PATCH /:id should not be able to update a book with invalid id", async () => {
    const response = await request(app).patch("/books/971").send({
      name: "Updated",
    })

    expect(response.statusCode).toBe(404)
  })

  it("DELETE /:id should be able to delete the specified book", async () => {
    const [book] = await BookFactory()

    const response = await request(app).delete(`/books/${book.id}`)

    expect(response.statusCode).toBe(204)
  })

  it("DELETE /:id should not be able to delete book that doesn't exists", async () => {
    const response = await request(app).delete("/books/925")

    expect(response.statusCode).toBe(404)
  })

  afterAll(async () => {
    await dbConnection.dropDatabase()
  })
})
