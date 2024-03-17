import * as s from "../services/products.js";

const getProducts = async (req, res, next) => {
    try {
        const products = await s.getProducts();
        res.json(products);
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
try {
 const result = await s.createProduct(req.body);
 res.status(201).json(result)
} catch(error) {
    next(error);
}
}

export {getProducts, createProduct}