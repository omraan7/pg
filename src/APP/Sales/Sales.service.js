const salesRepo = require("./Sales.repository");

const getSaless = async () => {
  const saless = await salesRepo.getAllSaless();

  if (saless.length === 0) {
    throw new Error("saless not found");
  }

  return saless;
};

const addSales = async (data) => {
  if (!data) {
    throw new Error("must write body");
  }

  if (
    data.productid === undefined ||
    data.productid === null ||
    data.productid === ""
  ) {
    throw new Error("must write productid");
  }

  if (
    data.quantity_sold === undefined ||
    data.quantity_sold === null ||
    data.quantity_sold === ""
  ) {
    throw new Error("must write quantity sold");
  }

  if (
    data.sale_date === undefined ||
    data.sale_date === null ||
    data.sale_date === ""
  ) {
    throw new Error("must write sale date");
  }

  if (!Number.isInteger(Number(data.productid))) {
    throw new Error("productid must be a number");
  }

  if (!Number.isInteger(Number(data.quantity_sold))) {
    throw new Error("quantity_sold must be a number");
  }

  if (Number(data.quantity_sold) <= 0) {
    throw new Error("quantity_sold must be positive");
  }

  if (new Date(data.sale_date) < new Date("1999-01-01")) {
    throw new Error("sale_date must be after 1999");
  }

  const product = await salesRepo.checkProduct(data.productid);

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
