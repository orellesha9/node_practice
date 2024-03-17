import * as s from '../services/products.js';
import { createError } from '../helpers/createError.js';

const getProducts = async (req, res, next) => {
  try {
    const products = await s.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const result = await s.createProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { params, body } = req;
    const result = await s.updateProduct(params.id, body);
    if (!result) {
      throw createError(404, 'Not found product');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { getProducts, createProduct, updateProduct };
