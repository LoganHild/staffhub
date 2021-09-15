INSERT INTO departments (department)
VALUES ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lead Engineer', 150000, 1),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 3),
        ('Software Engineer', 120000, 1),
        ('Account Manager', 160000, 2),
        ('Salesperson', 80000, 4),
        ('Lawyer', 190000, 3),
        ('Sales Lead', 100000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Logan', 'Hildebrandt', 1, null),
        ('Gage', 'Hildebrandt', 5, null),
        ('Aaron', 'Lorentz', 3, null),
        ('Bridget', 'Lorentz', 4, 1),
        ('Jenny', 'Hildebrandt', 8, null),
        ('Steve', 'Hildebrandt', 6, 5),
        ('Jessica', 'Growette', 7, 3),
        ('Jim', 'Lorentz', 2, 2);
