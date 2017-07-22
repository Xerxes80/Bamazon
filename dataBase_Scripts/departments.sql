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
