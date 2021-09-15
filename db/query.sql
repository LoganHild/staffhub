SELECT * FROM departments;

SELECT title, salary, department
FROM roles
JOIN departments
        ON roles.department_id = departments.id;

SELECT * FROM roles;

SELECT first_name, last_name, manager_id, title, salary, departments.department
FROM employees
JOIN roles
        ON employees.role_id = roles.id
JOIN departments
        ON roles.department_id = departments.id;
-- SELECT first_name, last_name, manager_id, title, salary
-- FROM employees
-- JOIN roles
--         ON employees.role_id = roles.id;

-- SELECT* FROM employees;
-- SELECT * 
-- FROM employees
-- JOIN employees
--         ON employees.manager_id = employees.id;