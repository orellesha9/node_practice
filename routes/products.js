import express from "express";
import { getProducts, createProduct } from "../controllers/productsControlers.js"

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", createProduct);

export default productsRouter;
