const express = require("express");

const router = express.Router();

const salesController = require("./Sales.controller");

router.post("/", salesController.addSales);

router.get("/", salesController.getSaless);

router.get("/product/:id", salesController.getSalesByProduct);

module.exports = router;
