import { MoreThan } from "typeorm"
import { Book, BookSchema } from "../models/book"

class BooksService {
  async getNameOfBooksInStock(page = 1) {
    const booksPerPage = 10
    const skip = booksPerPage * page - booksPerPage

    const books = await Book.find({
      select: { name: true },
      take: 10,
      skip,
      where: {
        stock: MoreThan(1),
      },
      order: {
        stock: "DESC",
      },
    })

    return books
  }

  async getById(id: number) {
    return Book.findOneBy({ id })
  }

  async save(bookData: BookSchema) {
    const book = new Book()

    book.name = bookData.name
    book.description = bookData.description
    book.author = bookData.author
    book.sbn = bookData.sbn
    book.stock = bookData.stock

    await book.save()

    return book
  }

  async update(id: number, bookData: Partial<BookSchema>) {
    const book = await this.getById(id)

    if (!book) throw new Error("Book not found")

    Object.entries(bookData).forEach(([k, v]) => {
      ;(book as { [k: string]: any })[k] = v
    })

    await book.save()

    return book
  }

  async deleteById(id: number) {
    const bookExists = await this.getById(id)
    if (!bookExists) throw new Error("Book not found")

    await Book.delete({ id })
  }
}

export default BooksService
