import { celebrate, Joi } from "celebrate"
import { Router } from "express"
import { BooksController } from "../controllers/books.controller"
import { BookSchema } from "../models/book"

const router = Router()
const booksRouter = Router()

booksRouter.get(
  "/",
  celebrate({
    query: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  BooksController.index
)
booksRouter.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  BooksController.getById
)
booksRouter.post(
  "/",
  celebrate({
    body: Joi.object<BookSchema>().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      sbn: Joi.string().required(),
      stock: Joi.number().required(),
    }),
  }),
  BooksController.create
)

router.use("/books", booksRouter)

export default router
