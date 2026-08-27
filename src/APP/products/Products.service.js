const getProductFromRepo = require("./Products.repository");
const getProducts = async () => {
  const products = await getProductFromRepo.getAllProducts();

  if (products.length === 0) {
    throw new Error("Products not found");
  }

  return products;
};

const addProducts = async (data) => {
  if (!data) {
    throw new Error("must write body");
  }

  if (data.name === undefined || data.name === null || data.name === "") {
    throw new Error("must write name");
  }

  if (data.price === undefined || data.price === null || data.price === "") {
    throw new Error("must write price");
  }

  if (
    data.stock_quantity === undefined ||
    data.stock_quantity === null ||
    data.stock_quantity === ""
  ) {
    throw new Error("must write stock_quantity");
  }

  if (
    data.supplierid === undefined ||
    data.supplierid === null ||
    data.supplierid === ""
  ) {
    throw new Error("must write supplierid");
  }

  if (typeof data.name !== "string") {
    throw new Error("name must be string");
  }

  if (typeof data.price !== "number" || data.price <= 0) {
    throw new Error("price must be a positive number");
  }

  if (!Number.isInteger(data.stock_quantity) || data.stock_quantity < 0) {
    throw new Error("stock_quantity must be a positive integer");
  }

  const Supplier = await getProductFromRepo.checkSupplier(data.supplierid);

  if (!Supplier) {
    throw new Error("Supplier not found");
  }

  return await getProductFromRepo.addProducts(data);
};

const addThreeProducts = async (data) => {
  if (!data) {
    throw new Error("must write body");
  }

  if (!Array.isArray(data)) {
    throw new Error("Body must be an array");
  }

  if (data.length !== 3) {
    throw new Error("You must add exactly 3 products");
  }

  for (const product of data) {
    if (!product.name) {
      throw new Error("must write name");
    }

    if (typeof product.price !== "number" || product.price <= 0) {
      throw new Error("price must be a positive number");
    }

    if (
      !Number.isInteger(product.stock_quantity) ||
      product.stock_quantity < 0
    ) {
      throw new Error("stock_quantity must be a positive integer");
    }

    if (!product.supplierName) {
      throw new Error("must write supplierName");
    }

    const supplier = await getProductFromRepo.checkSupplierByName(
      product.supplierName,
    );

    if (!supplier) {
      throw new Error(`Supplier ${product.supplierName} not found`);
    }
  }

  return await getProductFromRepo.addThreeProducts(data);
};
const getProduct = async (id) => {
  const product = await getProductFromRepo.getProduct(id);

  if (!product) {
    throw new Error("product not found");
  }
  return product;
};
const updateProduct = async (id, data) => {
  if (!data) {
    throw new Error("must write body");
  }

  if (data.name === undefined || data.name === null || data.name === "") {
    throw new Error("must write name");
  }

  if (data.price === undefined || data.price === null || data.price === "") {
    throw new Error("must write price");
  }

  if (
    data.stock_quantity === undefined ||
    data.stock_quantity === null ||
    data.stock_quantity === ""
  ) {
    throw new Error("must write stock_quantity");
  }

  if (
    data.supplierid === undefined ||
    data.supplierid === null ||
    data.supplierid === ""
  ) {
    throw new Error("must write supplierid");
  }

  if (typeof data.name !== "string") {
    throw new Error("name must be string");
  }

  if (typeof data.price !== "number" || data.price <= 0) {
    throw new Error("price must be a positive number");
  }

  if (!Number.isInteger(data.stock_quantity) || data.stock_quantity < 0) {
    throw new Error("stock_quantity must be a positive integer");
  }

  const Supplier = await getProductFromRepo.checkSupplier(data.supplierid);

  if (!Supplier) {
    throw new Error("Supplier not found");
  }

  const product = await getProductFromRepo.updateProduct(id, data);

  if (!product) {
    throw new Error("product not found");
  }

  return product;
};
const deleteProduct = async (id) => {
  const product = await getProductFromRepo.deleteProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

module.exports = {
  getProducts,
  addProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addThreeProducts,
};
