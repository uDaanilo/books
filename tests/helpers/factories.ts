import { faker } from "@faker-js/faker"
import { Book, BookSchema } from "../../src/models/book"

const BookFactory = async (
  bookData?: Omit<BookSchema, "sbn">,
  quantity = 1
) => {
  for (let i = 0; i < quantity; i++) {
    const book = new Book()
    const rng = Math.floor(Math.random() * 100)

    book.name = bookData?.name || faker.name.jobTitle()
    book.description = bookData?.name || faker.lorem.paragraph()
    book.author = bookData?.author || faker.name.fullName()
    book.stock = bookData?.stock || rng

    await book.save()
  }
}

export { BookFactory }
