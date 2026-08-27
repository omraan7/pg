const pool = require("../../config");
const getAllProducts = async () => {
  const result = await pool.query("select * from products");
  return result.rows;
};
const addProducts = async (data) => {
  const { name, price, stock_quantity, supplierid } = data;
  const result = await pool.query(
    `insert into products(name, price, stock_quantity, supplierid) 
   values ($1, $2, $3, $4) RETURNING *`,
    [name, price, stock_quantity, supplierid],
  );

  return result.rows[0];
};
const getProduct = async (id) => {
  const result = await pool.query("select * from products where id =$1", [id]);
  return result.rows[0];
};
const updateProduct = async (id, data) => {
  const result = await pool.query(
    `UPDATE products
       SET name = COALESCE($1, name),
           price = COALESCE($2, price),
           stock_quantity = COALESCE($3, stock_quantity),
           supplierid = COALESCE($4, supplierid)
       WHERE id = $5
       RETURNING *`,
    [data.name, data.price, data.stock_quantity, data.supplierid, id],
  );
  return result.rows[0];
};
const deleteProduct = async (id) => {
  const result = await pool.query(
    "delete from products where id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
const checkSupplier = async (id) => {
  const result = await pool.query("SELECT * FROM Suppliers WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
};
const checkSupplierByName = async (name) => {
  const result = await pool.query(
    "SELECT * FROM suppliers WHERE name = $1",
    [name]
  );

  return result.rows[0];
};


const addThreeProducts = async (data) => {
  try {
    await pool.query("BEGIN");

    const columns = [
      "name",
      "price",
      "stock_quantity",
      "supplierName"
    ];

    const products = data.flatMap(
      ({ name, price, stock_quantity, supplierName }) => [
        name,
        price,
        stock_quantity,
        supplierName
      ]
    );

    const values = data
      .map((_, index) => {
        const start = index * columns.length;

        return `(${columns
          .map(
            (_, columnIndex) =>
              `$${start + columnIndex + 1}`
          )
          .join(", ")})`;
      })
      .join(", ");

    const query = `
  INSERT INTO products
  (name, price, stock_quantity, supplierid)

  SELECT
    v.name,
    v.price::numeric,
    v.stock_quantity::integer,
    s.id

  FROM (
    VALUES ${values}
  ) AS v(
    name,
    price,
    stock_quantity,
    supplierName
  )

  JOIN suppliers s
    ON s.name = v.supplierName

  RETURNING products.*;
`;

    const result = await pool.query(query, products);

    await pool.query("COMMIT");

    return result.rows;

  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

module.exports = {
  getAllProducts,
  addProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  checkSupplier,
  checkSupplierByName,
  addThreeProducts,
};
