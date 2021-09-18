const Employee = require('./Employees');

class Department extends Employee {
    constructor(first_name, last_name, role_id, manager_id, department) {

        super(first_name, last_name, role_id, manager_id);
        this.department = department;
    }

    getDepartment() {
        return this.department;
    }

    getValue() {
        return "Department";
    }

}

module.exports = Department;