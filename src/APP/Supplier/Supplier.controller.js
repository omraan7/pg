const supplierService = require("./Supplier.service");

const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getSuppliers();

    res.status(200).json({
      message: "success",
      data: suppliers,
    });
  } catch (error) {
    next(error);
  }
};

const addSupplier = async (req, res, next) => {
  try {
      
    if(!req.body)throw new Error("must write body ")
    const supplier = await supplierService.addSupplier(
      req.body
    );

    res.status(201).json({
      message: "success",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const id = req.params.id;

    const supplier =
      await supplierService.updateSupplier(
        id,
        req.body
      );

    res.status(200).json({
      message: "success",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const id = req.params.id;

    const supplier =
      await supplierService.deleteSupplier(id);

    res.status(200).json({
      message: "success supplier deleted",
    
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};