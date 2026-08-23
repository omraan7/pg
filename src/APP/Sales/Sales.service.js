const salesRepo = require("./Sales.repository");

const getSaless = async () => {
  const saless = await salesRepo.getAllSaless();

  if (saless.length === 0) {
    throw new Error("saless not found");
  }

  return saless;
};

const addSales = async (data) => {
  const product = await salesRepo.checkProduct(data.productid);
  if (new Date(data.sale_date) < new Date("1999-01-01"))
    throw new Error("sale_date must be after 1999");
  if (data.quantity_sold <= 0)
    throw new Error("quantity_sold must be positive");

  if (!product) {
    throw new Error("Product not found");
  }
  const sales = await salesRepo.addSales(data);

  return sales;
};

const getSalesByProduct = async (productid) => {
  const sales = await salesRepo.getSalesByProduct(productid);

  if (sales.length === 0) {
    throw new Error("No sales found for this product");
  }

  return sales;
};

module.exports = {
  getSaless,
  addSales,
  getSalesByProduct,
};
