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

    enter() {
    }
}

module.exports = Role;