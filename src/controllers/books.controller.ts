import { Request, Response } from "express"
import BooksService from "../services/books.service"

class BooksController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params

    const booksService = new BooksService()
    const book = await booksService.getById(+id)

    return res.json(book)
  }

  static async index(req: Request, res: Response) {
    const { page = 1 } = req.query

    const booksService = new BooksService()
    const books = await booksService.getNameOfBooksInStock(page as number)

    return res.json(books)
  }

  static async create(req: Request, res: Response) {
    const { name, description, author, sbn, stock } = req.body

    const booksService = new BooksService()
    const book = await booksService.save({
      name,
      description,
      author,
      sbn,
      stock,
    })

    return res.status(201).json({
      id: book.id,
      name: book.name,
    })
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, author, sbn, stock } = req.body

    const booksService = new BooksService()
    try {
      const book = await booksService.update(+id, {
        name,
        description,
        author,
        sbn,
        stock,
      })

      return res.json({
        id: book.id,
        name: book.name,
        description: book.description,
        author: book.author,
        sbn: book.sbn,
        stock: book.stock,
      })
    } catch (err: any) {
      if (err?.message === "Book not found") {
        return res.status(404).json({
          error: "Book not found",
        })
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params

    const booksService = new BooksService()
    try {
      await booksService.deleteById(+id)

      return res.status(204).json()
    } catch (err: any) {
      if (err?.message === "Book not found") {
        return res.status(404).json({
          error: "Book not found",
        })
      }
    }
  }
}

export { BooksController }
