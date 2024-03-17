import path from "path"
import fs from "fs/promises";

const productsPath = path.resolve("db", "db.json");

export const getProducts = async () => {
    const data = await fs.readFile(productsPath);
    return JSON.parse(data);
}
