const getProductFromRepo = require("./Products.repository");
const getProducts = async () => {
  const products = await getProductFromRepo.getAllProducts();

  if (products.length === 0) {
    throw new Error("Products not found");
  }

  return products;
};

const addProducts = async (data) => {
  if (!data) throw new Error("must write body ");
  const Supplier = await getProductFromRepo.checkSupplier(data.supplierid);
if (
  typeof data.price !== "number" ||
  data.price <= 0 ||
  !Number.isInteger(data.price)
) {
  throw new Error("price must be a positive integer");
}
  if (data.stock_quantity < 0)
    throw new Error("stock_quantity must be positive");
  if (!Supplier) throw new Error("Supplier not found");

  return await getProductFromRepo.addProducts(data);
};

const getProduct = async (id) => {
  const product = await getProductFromRepo.getProduct(id);

  if (!product) {
    throw new Error("product not found");
  }
  return product;
};
const updateProduct = async (id, data) => {
  if (!data) throw new Error("must write body ");

  const product = await getProductFromRepo.updateProduct(id, data);
  const Supplier = await getProductFromRepo.checkSupplier(data.supplierid);
  if (data.price < 0 || data.price === String(data.price))
    throw new Error("price must be positive and integer");
  if (data.stock_quantity < 0)
    throw new Error("stock_quantity must be positive");
  if (!Supplier) throw new Error("Supplier not found");

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
};
