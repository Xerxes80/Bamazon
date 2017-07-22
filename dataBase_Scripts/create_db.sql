DROP DATABASE IF EXISTS Bamazon_DB;

CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO  products (product_name, department_name, price, stock_quantity)
VALUES ("hat", "apparel", 19.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fuji_bike", "bikes", 599.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sneakers", "shoes", 89.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "apparel", 69.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gloves", "apparel", 24.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("masi_bike", "bikes", 899.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bottles", "sport", 14.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("backpacks", "travel", 199.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skis", "snow", 249.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("compass", "camp", 9.99, 45);







