const Company = require('./company');

class Role extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT
                            role.role_id AS Id,
                            role.role_title AS Title,
                            department.dep_name AS Department,
                            role.role_salary AS Salary
                            FROM role
                            JOIN department ON role.dep_id = department.dep_id`, 
            (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
    }

    getDepartments() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT dep_name 
                            FROM department`, 
            (error, result) => {
                error ? reject(error) : resolve(result.map((row) => row.dep_name));
            });
        });
    }

    enter(newRol, newRolSal, newRolDep) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT 
                            INTO role (role_title, role_salary, dep_id)
                            VALUES ("${newRol}", ${newRolSal}, ${newRolDep})`, 
            (error, result) => {
                error ? reject(error) : resolve(`Added ${newRol} ($${newRolSal}) to the Role Table`);
            });
        });
    }
}

module.exports = Role;