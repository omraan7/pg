const supplierRepo = require("./Supplier.repository");

const getSuppliers = async () => {
  const suppliers = await supplierRepo.getAllSuppliers();

  if (suppliers.length === 0) {
    throw new Error("Suppliers not found");
  }

  return suppliers;
};

const addSupplier = async (data) => {
  if (!data) throw new Error("must write body ");
  if (typeof data.name !== "string") throw new Error("name must be string");
  const supplier = await supplierRepo.addSupplier(data);

  return supplier;
};

const updateSupplier = async (id, data) => {
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
