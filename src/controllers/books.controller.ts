import { Request, Response } from "express"
import BooksService from "../services/books.service"

class BooksController {
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
}

export { BooksController }
