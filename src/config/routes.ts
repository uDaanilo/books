import { Router } from "express"
import { BooksController } from "../controllers/books.controller"

const router = Router()
const booksRouter = Router()

booksRouter.post("/", BooksController.create)

router.use("/books", booksRouter)

export default router
