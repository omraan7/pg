const pool = require("../../config");

const getAllSaless = async () => {
  const result = await pool.query(
`     SELECT * FROM Sales
`
    // `SELECT Sales.id, Products.name as Product_name,Sales.quantity_sold,Sales.sale_date 
    // FROM Sales join Products
    // ON Sales.productid=Products.id
    // `
    ,
  );

  return result.rows;
};

const addSales = async (data) => {
  const { productid, quantity_sold, sale_date } = data;

  const result = await pool.query(
    `INSERT INTO Sales
    (productid, quantity_sold, sale_date)
    VALUES ($1, $2, COALESCE($3, CURRENT_DATE))
    RETURNING *`,
    [productid, quantity_sold, sale_date],
  );

  return result.rows[0];
};
const checkProduct = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  return result.rows[0];
};

const getSalesByProduct = async (productid) => {
  const result = await pool.query(
    `SELECT * FROM Sales
     WHERE productid = $1`,
    [productid],
  );

  return result.rows;
};
module.exports = {
  getAllSaless,
  addSales,
  checkProduct,
  getSalesByProduct,
};
