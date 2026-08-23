

const express = require("express");

const router = express.Router();

const supplierController = require("./Supplier.controller");

router.post("/", supplierController.addSupplier);

router.get("/", supplierController.getSuppliers);

router.put("/:id", supplierController.updateSupplier);

router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
