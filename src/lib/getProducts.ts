import { promises as fs } from "fs";
import { cacheTag } from "next/cache";
import path from "path";

export async function getProducts() {
  "use cache";

  cacheTag("products");

  const filePath = path.join(process.cwd(), "src/data/products.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const products = JSON.parse(fileContents);

  return products;
}
