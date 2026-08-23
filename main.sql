

-- CREATE DB AND TABLE 
CREATE DATABASE assignment_sql;


CREATE TABLE Suppliers(
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  Contact_Number VARCHAR(255) NOT NULL
);

CREATE TABLE Products(
  id  SERIAL PRIMARY KEY ,
  name VARCHAR(255) NOT NULL,
  price decimal NOT NULL ,
  stock_Quantity INT NOT NULL,
  SupplierID INT NOT NULL,
  foreign key (SupplierID) references Suppliers(id)
);
CREATE TABLE Sales(
  id  SERIAL PRIMARY KEY ,
  ProductID INT NOT NULL,
  Quantity_Sold INT NOT NULL,
  Sale_Date DATE NOT NULL, 
    foreign key (ProductID) references Products(id)
);



--  FROM QUESTION -5 -------------ENG SHORA SAID DONT USE THE API JUST SQL QUERY

-- Add a Category column to the Products table. 

ALTER TABLE Products ADD COLUMN Category VARCHAR(255)

-- Remove the Category column 
ALTER TABLE Products DROP COLUMN Category

-- Change ContactNumber to VARCHAR(15).
ALTER TABLE Suppliers ALTER COLUMN Contact_Number TYPE VARCHAR(15)

-- Add a NOT NULL constraint to ProductName. 
ALTER TABLE Products ALTER COLUMN name SET NOT NULL

-- //////////////////////////////////////////

-- QUESTION-6

--  Add a supplier with the name 'FreshFoods' and contact number '01001234567'
INSERT INTO Suppliers (name, Contact_Number)
VALUES ('FreshFoods', '01001234567');


-- Insert the following three products, all provided by 'FreshFoods':
INSERT INTO Products (name, price, stock_quantity, supplierid)
VALUES
('Milk', 15, 50,(SELECT id FROM Suppliers WHERE name = 'FreshFoods')),

('Bread', 10, 30,(SELECT id FROM Suppliers WHERE name = 'FreshFoods')),

('Eggs', 20, 40,(SELECT id FROM Suppliers WHERE name = 'FreshFoods'));


-- Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
INSERT INTO Sales (productid, quantity_sold, sale_date)
VALUES (
    (SELECT id FROM Products WHERE name = 'Milk'),
    2,
    '2025-05-20'
);


-- 7 update the price of 'Bread' to 25.00. 
UPDATE Products
SET price = 25.00
WHERE name = 'Bread';


-- 8. Delete the product Eggs
DELETE FROM Products
WHERE name = 'Eggs';




--9 Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions. 
SELECT
    Products.name AS product_name,
    SUM(Sales.quantity_sold) AS total_quantity_sold
FROM Sales
JOIN Products
    ON Sales.productid = Products.id
GROUP BY Products.id, Products.name;

-- 10 Create a reporting endpoint to retrieve the product with the highest stock quantity.
SELECT *
FROM Products
ORDER BY stock_quantity DESC
LIMIT 1;

-- 11 Create a reporting endpoint to retrieve suppliers whose names start with 'F'
SELECT *
FROM Suppliers
WHERE name LIKE 'F%';


--12 Create a reporting endpoint to retrieve all products that have never been sold
SELECT *
FROM Products p
WHERE NOT EXISTS (
    SELECT 1
    FROM Sales s
    WHERE s.productid = p.id
);


-- 13 Create a reporting endpoint to retrieve all sales including
-- ● Product name 
-- ● Quantity sold 
-- ● Sale date using SQL JOIN operations. 

-- I DID IT IN SALES.REPO.JS FILE AND I ADD COMMENT IN FUNCTION getAllSaless 

SELECT
    Products.name AS product_name,
    Sales.quantity_sold,
    Sales.sale_date
FROM Sales
JOIN Products
    ON Sales.productid = Products.id;


--14 Create a SQL script or secure administrative endpoint to create a MySQL user named store_manager and grant the 
-- following permissions on all tables: (0.5 Grade)  
-- ● SELECT 
-- ● INSERT 
-- ● UPDATE  
CREATE USER store_manager
WITH PASSWORD 'store_manager123';

GRANT SELECT, INSERT, UPDATE
ON ALL TABLES IN SCHEMA public
TO store_manager;


-- 15 Revoke the UPDATE permission from “store_manager”
REVOKE UPDATE
ON ALL TABLES IN SCHEMA public
FROM store_manager;


-- 16 Grant DELETE permission to “store_manager” only on the Sales table.
GRANT DELETE
ON TABLE Sales
TO store_manager;



-- ///////////////////////////////////////END/////////
-- FOR TEST 

SELECT* FROM Suppliers;
SELECT* FROM Sales;
SELECT* FROM Products;

