import { celebrate, Joi } from "celebrate"
import { Router } from "express"
import { BooksController } from "../controllers/books.controller"
import { Book, BookSchema } from "../models/book"

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
      sbn: Joi.custom((val, helpers) => {
        if (!Book.isValidSbn(val))
          return helpers.message({ error: "Invalid sbn" })

        return val
      }).required(),
      stock: Joi.number().min(1).required(),
    }),
  }),
  BooksController.create
)
booksRouter.patch(
  "/:id",
  celebrate({
    body: Joi.object<BookSchema>().keys({
      name: Joi.string(),
      description: Joi.string(),
      author: Joi.string(),
      stock: Joi.number(),
    }),
  }),
  BooksController.update
)
booksRouter.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  BooksController.delete
)

router.use("/books", booksRouter)

export default router
