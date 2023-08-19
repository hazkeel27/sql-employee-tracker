const Company = require('./company');

class Employee extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT 
                            employee.emp_id AS Id, 
                            employee.first_name AS Firstname, 
                            employee.last_name AS Lastname, 
                            role.role_title AS Title, 
                            department.dep_name AS Department, 
                            role.role_salary AS Salary, 
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
                            FROM department 
                            JOIN role 
                            ON department.dep_id = role.dep_id 
                            JOIN employee 
                            ON employee.role_id = role.role_id 
                            LEFT JOIN employee AS manager 
                            ON employee.manager_id = manager.emp_id;`, 
            (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
    }

    enter() {
    }
}

module.exports = Employee;