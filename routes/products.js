import express from "express";
import { getProducts } from "../services/products.js"

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        next(error)
    }
});

export default productsRouter;
