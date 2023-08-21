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
                const managerId = await this.getManagerId(manager);
    
                this.db.promise().query(`
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${firstname}", "${lastname}", ${roleId}, ${managerId})`)
                .then(() => {
                    resolve(`Added ${firstname} ${lastname} as a ${role} to the Employee Table`);
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
    
    getManagerId(manager) {
        //console.log(manager);
        if (manager == 'None') {
            return null;
        }
    
        const [managerFirst, managerLast] = manager.split(' ');
    
        return this.db.promise().query(`
            SELECT emp_id 
            FROM employee 
            WHERE first_name = "${managerFirst}" AND last_name = "${managerLast}"`)
        .then(result => {
            if (result[0].length === 0) {
                throw new Error(`Manager '${manager}' not found.`);
            }
            return result[0][0].emp_id;
        });
    }
    
    getManagers() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT 
                CONCAT(first_name, ' ', last_name) AS Managers
                FROM employee`, 
            (error, result) => {
                const managers = result.map((row) => row.Managers);
                managers.unshift('None');
                error ? reject(error) : resolve(managers);
            });
        });
    }
}

module.exports = Employee;