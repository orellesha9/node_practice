import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
} from '../controllers/productsControlers.js';
import * as validation from '../midlewares/validateProducts.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.post('/', validation.add, createProduct);

productsRouter.patch('/:id', validation.update, updateProduct);

export default productsRouter;
