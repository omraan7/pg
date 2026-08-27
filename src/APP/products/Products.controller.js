const getAllProductFromService = require("./Products.service.js");
const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProductFromService.getProducts();

    res.status(200).json({ message: "success", data: products });
  } catch (error) {
    next(error);
  }
};
const addProducts = async (req, res, next) => {
  try {
    const result = await getAllProductFromService.addProducts(req.body);
    res.status(200).json({ message: "success product added", data: result });
  } catch (error) {
    next(error);
  }
};
const addThreeProducts = async (req, res, next) => {
  try {
    const result = await getAllProductFromService.addThreeProducts(req.body);

    res.status(201).json({
      message: "success 3 products added",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getAllProductFromService.getProduct(id);
    res.status(200).json({ message: "success", data: product });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.id;
    const product = await getAllProductFromService.updateProduct(id, req.body);
    res.status(200).json({ message: "success product updated", data: product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getAllProductFromService.deleteProduct(id);
    res.status(200).json({
      message: "success product deleted",
      // data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  addProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addThreeProducts,
};
