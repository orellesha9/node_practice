import express from "express";
import productsRouter from "./routes/products.js";

const app = express();

app.use((req, res, next) => {
    console.log(req.method);
    next();
});

app.use("/products", productsRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
    });
});

app.use((error, req, res, next) => {
    const { status = 500, message } = error;
    res.status(status).json({ message });
});

app.listen(3000, () => {
    console.log("Server start port 3000");
});
