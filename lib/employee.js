const { first } = require('rxjs');
const Company = require('./company');

class Employee extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT 
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

    enter(firstname, lastname, role, manager) {
        return new Promise(async (resolve, reject) => {
            try {
                const roleId = await this.getRoleId(role);
                const managerId = await this.getEmployeeId(manager);
    
                this.db.promise().query(`
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${firstname}", "${lastname}", ${roleId}, ${managerId})`)
                .then(() => {
                    resolve(`SUCCESS: Added ${firstname} ${lastname} as a ${role} to the Employee Table`);
                })
                .catch(error => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateRole(updateEmployee, newRole) {
        return new Promise(async (resolve, reject) => {
            try {
                const roleId = await this.getRoleId(newRole);
                const employeeId = await this.getEmployeeId(updateEmployee);
    
                this.db.promise().query(`
                    UPDATE employee
                    SET role_id = ${roleId} 
                    WHERE emp_id = ${employeeId}`)
                .then(() => {
                    resolve(`SUCCESS: ${updateEmployee} is the new ${newRole}`);
                })
                .catch(error => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateManager(updateEmployee, newManager) {
        return new Promise(async (resolve, reject) => {
            try {
                const employeeId = await this.getEmployeeId(updateEmployee);
                const managerId = await this.getEmployeeId(newManager);

                if (employeeId == managerId) {
                    reject(`Employee cannot be their own manager!`);
                }
    
                this.db.promise().query(`
                    UPDATE employee
                    SET manager_id = ${managerId} 
                    WHERE emp_id = ${employeeId}`)
                .then(() => {
                    resolve(`SUCCESS: ${updateEmployee}'s new Manager is ${newManager}`);
                })
                .catch(error => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    getRoleId(role) {
        return this.db.promise().query(`
            SELECT role_id
            FROM role 
            WHERE role_title = "${role}"`)
        .then(result => {
            if (result[0].length === 0) {
                throw new Error(`Role '${role}' not found.`);
            }
            return result[0][0].role_id;
        });
    }
    
    getEmployeeId(employee) {
        if (employee == 'None') {
            return null;
        }
    
        const [employeeFirst, employeeLast] = employee.split(' ');
    
        return this.db.promise().query(`
            SELECT emp_id 
            FROM employee 
            WHERE first_name = "${employeeFirst}" AND last_name = "${employeeLast}"`)
        .then(result => {
            if (result[0].length === 0) {
                throw new Error(`Employee '${employee}' not found.`);
            }
            return result[0][0].emp_id;
        });
    }
    
    getEmployees() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT 
                CONCAT(first_name, ' ', last_name) AS Employees
                FROM employee`, 
            (error, result) => {
                const employees = result.map((row) => row.Employees);
                error ? reject(error) : resolve(employees);
            });
        });
    }
}

module.exports = Employee;