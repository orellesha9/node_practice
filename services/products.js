import path from 'path';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';

const productsPath = path.resolve('db', 'db.json');

export const getProducts = async () => {
  const data = await fs.readFile(productsPath);
  return JSON.parse(data);
};

export const createProduct = async product => {
  const id = nanoid();
  product.id = id;
  const products = await getProducts();
  products.push(product);
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  return product;
};

export const updateProduct = async (id, data) => {
  const products = await getProducts();
  const productIndex = products.findIndex(item => item.id === id);
  if (productIndex === -1) {
    return null;
  }
  products[productIndex] = { ...products[productIndex], ...data };
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  return products[productIndex];
};
