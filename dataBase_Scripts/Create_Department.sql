USE Bamazon_DB;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

ALTER TABLE `Bamazon_DB`.`departments` 
ADD COLUMN `product_sales` DECIMAL(10,2) NULL AFTER `over_head_costs`;

INSERT INTO departments (department_id, department_name, over_head_costs, product_sales) 
VALUES (1, 'Apparel', 6000, 10000),
(2, 'Bikes', 12000, 20000),
(3, 'Shoes', 3500, 6000),
(4, 'Sport', 18000, 30000),
(5, 'Travel', 12000, 20000),
(6, 'Snow', 19000, 25000),
(7, 'Camp', 3000, 5000);