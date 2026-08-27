const express = require("express");

const router = express.Router();
const getAllProductsFromController = require("./Products.controller");
router.get("/", getAllProductsFromController.getProducts);
router.post("/", getAllProductsFromController.addProducts);
router.post("/th", getAllProductsFromController.addThreeProducts);
router.get("/:id", getAllProductsFromController.getProduct);
router.put("/:id", getAllProductsFromController.updateProduct);
router.delete("/:id", getAllProductsFromController.deleteProduct);

module.exports = router;
