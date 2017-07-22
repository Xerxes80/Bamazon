 DROP DATABASE IF EXISTS Bamazon_DB;
 
 CREATE DATABASE Bamazon_DB;

 USE Bamazon_DB;
 
 Drop table if exists products;

 CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (id)
 );

INSERT INTO  products (product_name, department_name, price, stock_quantity)

VALUES ("hat", "apparel", 19.99, 100),

 ("fuji_bike", "bikes", 599.99, 100),

 ("sneakers", "shoes", 89.99, 100),

 ("pants", "apparel", 69.99, 100),

 ("gloves", "apparel", 24.99, 100),

 ("masi_bike", "bikes", 899.99, 4),

 ("bottles", "sport", 14.99, 100),

 ("backpacks", "travel", 199.99, 100),

 ("skis", "snow", 249.99, 100),
 
 ("compass", "camp", 9.99, 100);