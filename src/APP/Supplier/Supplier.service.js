const supplierRepo = require("./Supplier.repository");

const validateSupplierData = (data) => {
  if (!data) {
    throw new Error("must write body");
  }
  if (data.name === undefined || data.name === null || data.name === "") {
    throw new Error("must write name");
  }
  if (
    data.contact_number === undefined ||
    data.contact_number === null ||
    data.contact_number === ""
  ) {
    throw new Error("must write contact number");
  }
  if (typeof data.name !== "string") {
    throw new Error("name must be string");
  }
  if (typeof data.contact_number !== "string") {
    throw new Error("contact number must be string");
  }
};
const getSuppliers = async () => {
  const suppliers = await supplierRepo.getAllSuppliers();

  if (suppliers.length === 0) {
    throw new Error("Suppliers not found");
  }

  return suppliers;
};

const addSupplier = async (data) => {
  validateSupplierData(data);

  const supplier = await supplierRepo.addSupplier(data);

  return supplier;
};

const updateSupplier = async (id, data) => {
  validateSupplierData(data);

  const supplier = await supplierRepo.updateSupplier(id, data);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};

const deleteSupplier = async (id) => {
  const supplier = await supplierRepo.deleteSupplier(id);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};

module.exports = {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};
