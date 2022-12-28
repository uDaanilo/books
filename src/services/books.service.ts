import { Book, BookSchema } from "../models/book"

class BooksService {
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
}

export default BooksService
