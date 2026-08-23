const express = require("express");

const salesFromRoute = require("./APP/Sales/Sales.Routes");
const ProductsFromRoute = require("./APP/products/Products.Routes");
const SuppliersFromRoute = require("./APP/Supplier/Supplier.Routes");

const app = express();
app.use(express.json());
const port = 3000;

app.use("/Products", ProductsFromRoute);
app.use("/Suppliers", SuppliersFromRoute);
app.use("/Sales", salesFromRoute);

app.use((err, req, res, next) => {
  res.status(404).json({ message: err.message });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
