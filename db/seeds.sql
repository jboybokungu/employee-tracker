USE employee_db;

INSERT INTO department(name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("IT"),
        ("Human Resource");


INSERT INTO role(title, salary, department_id)
VALUES ("Salesperson", 40000.00, 1),
        ("Sales Manager", 60000.00, 1),
        ("software Engineer", 90000.00, 2),
        ("Electrical Engineer", 80000.00, 2),
        ("Financial Analyst", 60000.00, 3),
        ("Business Analyst", 55000.00, 3),
        ("Web Developper", 75000.00, 4),
        ("Network Engineer", 110000.00, 4),
        ("Human Resources Manager", 85000.00, 5),
        ("Human Resources Coordinator", 70000.00, 5),
        ("Human Resources Specialist", 72000.00, 5);



INSERT INTO employee(firt_name, last_name, role_id, manager_id)
VALUES ("Jonathan", "Bokungu", 3, NULL),
        ("Andres", "Long", 2, NULL),
        ("John", "Doe", 1, 2),
        ("Carson", "Wolf", 4, NULL),
        ("Jessica", "Jones", 5, NULL);

