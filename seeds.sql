  INSERT INTO role(`title`, `salary`, `department_id`)
	VALUES("Human Resource Specialist", 50000, 2);
    
    INSERT INTO role(`title`, `salary`, `department_id`)
	VALUES("Programmer", 70000, 3);
		
 INSERT INTO employee(`first_name`, `last_name`, `role_id`, `manager_id`)
	VALUES("John", "Doe", 2, 3);
    
 INSERT INTO employee(`first_name`, `last_name`, `role_id`, `manager_id`)
	VALUES("Steve", "Smith", 1, 1);
    
 INSERT INTO department(`id`,`name`)
	VALUES(2, "Human Resources");