const express = require("express");
const app = express();
const port = 3000;

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 10 },
];

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/product", (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0) {
    return res.status(400).json({ message: "Product data is missing" });
  }
  products.forEach((ele) => {
    if (ele.name === product.name) {
      return res.status(400).json({ message: "Product already exists" });
    }
  });
  products.push(product);
  res.status(201).json(product);
});
app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const search_product = products.find((ele) => ele.id == id);
  const product = req.body;
  if (!product) return res.status(404).send("Product not found");

  search_product.name = product.name ?? search_product.name;
  search_product.category = product.category ?? search_product.category;
  search_product.price = product.price ?? search_product.price;
  search_product.stock = product.stock ?? search_product.stock;

  res.status(200).json({ msg: "update success" });
});
app.delete("/product/:id", (req, res) => {
  const product = products.findIndex((ele) => ele.id == req.params.id);
  if (product === -1) return res.status(404).send("Product not found");
  products.splice(product, 1);
  res.status(200).json({ msg: "delete sucess", products: products[product] });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
