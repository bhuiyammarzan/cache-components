"use server";

import fs from "fs/promises";
import { updateTag } from "next/cache";
import path from "path";

export const addProduct = async (formData: FormData) => {
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");

  // Read current products
  const filePath = path.join(process.cwd(), "src/data/products.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const products = JSON.parse(fileContents);

  //   Add new product
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price as string),
    stock: parseInt(stock as string),
  };

  products.push(newProduct);

  // Write back to file
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));

  updateTag("products");
};
