import { Router } from "express"
import { BooksController } from "../controllers/books.controller"

const router = Router()
const booksRouter = Router()

booksRouter.get("/", BooksController.index)
booksRouter.post("/", BooksController.create)

router.use("/books", booksRouter)

export default router
