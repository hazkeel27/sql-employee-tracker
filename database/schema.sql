DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    dep_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL(10, 2) NOT NULL,
    dep_id INT NOT NULL,
    FOREIGN KEY (dep_id) REFERENCES department(dep_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);