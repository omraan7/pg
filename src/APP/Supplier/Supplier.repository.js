const pool = require("../../config");

const getAllSuppliers = async () => {
  const result = await pool.query(
    "SELECT * FROM suppliers"
  );

  return result.rows;
};

const addSupplier = async (data) => {
  const { name, contact_number } = data;

  const result = await pool.query(
    `INSERT INTO suppliers
    (name, contact_number)
    VALUES ($1, $2)
    RETURNING *`,
    [name, contact_number]
  );

  return result.rows[0];
};

const updateSupplier = async (id, data) => {
  const result = await pool.query(
    `UPDATE suppliers
     SET name = COALESCE($1, name),
         contact_number = COALESCE($2, contact_number)
     WHERE id = $3
     RETURNING *`,
    [
      data.name,
      data.contact_number,
      id
    ]
  );

  return result.rows[0];
};

const deleteSupplier = async (id) => {
  const result = await pool.query(
    `DELETE FROM suppliers
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};