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

const createImages = async (req, res, next) => {
  try {
    if(!req.files.length) {
      throw createError(400, "Files not passed")
    }
    console.log(req.files)
    res.json("createImages OK")
  } catch (error) {
    next(error)
  }
}

export { getProducts, createProduct, updateProduct, createImages };
