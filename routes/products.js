import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  createImages
} from '../controllers/productsControlers.js';
import * as validation from '../midlewares/validateProducts.js';
import upload from '../midlewares/upload.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.post('/', validation.add, createProduct);

productsRouter.patch('/:id', validation.update, updateProduct);

productsRouter.post('/:id/images', upload.array('images', 2), createImages)

export default productsRouter;
