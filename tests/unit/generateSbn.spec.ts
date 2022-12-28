import { Book } from "../../src/models/book"

it("should generate a valid brazillian isbn", () => {
  const sbn = Book.generateSbn()

  expect(Book.sbnPattern.test(sbn)).toBeTruthy()
})

it("should generate a invalid brazillian isbn", () => {
  const sbn = Book.generateSbn() + "1"

  expect(Book.sbnPattern.test(sbn)).toBeFalsy()
})
