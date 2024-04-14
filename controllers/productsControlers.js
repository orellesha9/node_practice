import * as s from "../services/products.js";
import { createError } from "../helpers/createError.js";
import path from "path";
import fs from "fs/promises";
import Product from "../models/Product.js";

const productsImagePath = path.resolve("public", "images");

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
      throw createError(404, "Not found product");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createImages = async (req, res, next) => {
  try {
    if (!req.files.length) {
      throw createError(400, "Files not passed");
    }

    const { path: oldPath, filename } = req.files;
    const pathes = req.files.map(async ({ path: oldPath, filename }) => {
      const newPath = path.join(productsImagePath, filename);
      await fs.rename(oldPath, newPath);

      const publicPath = path.join("images", filename);
      return publicPath;
    });
    const promiseResult = await Promise.allSettled(pathes);
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      // productImages: promiseResult.map(({ value }) => value),
      $push: {
        productImages: { $each: promiseResult.map(({ value }) => value) },
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export { getProducts, createProduct, updateProduct, createImages };
