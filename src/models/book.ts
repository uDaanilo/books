import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm"
import { generateRandomNumberChars } from "../helpers/generateRandomNumberChars"

@Entity()
class Book extends BaseEntity {
  static sbnPattern = /^[0-9]{2}-[0-9]{3}-[0-9]{4}-[0-9]{1}$/

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  author: string

  @Column()
  sbn: string

  @Column()
  stock: number

  @BeforeInsert()
  private setRandomSbn() {
    if (this.sbn) return

    this.sbn = Book.generateSbn()
  }

  static generateSbn() {
    return `${generateRandomNumberChars(2)}-${generateRandomNumberChars(
      3
    )}-${generateRandomNumberChars(4)}-${generateRandomNumberChars(1)}`
  }
}

type BookSchema = Pick<
  Book,
  "name" | "description" | "author" | "sbn" | "stock"
>

export { Book, BookSchema }
