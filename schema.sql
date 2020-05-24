DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

 CREATE TABLE employee(
	`id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT,
    `manager_id` INT,
    PRIMARY KEY(`id`)
 );
 
 CREATE TABLE role(
	`id`  INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30),
    `salary` DECIMAL (30),
    `department_id` INT,
    PRIMARY KEY(`id`)
 );
 
 CREATE TABLE department(
	`id`  INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30),
    PRIMARY KEY(`id`)
 );