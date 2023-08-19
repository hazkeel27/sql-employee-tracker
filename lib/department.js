const Company = require('./company');

class Department extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT 
                            dep_id AS Id, 
                            dep_name AS Department 
                            FROM department`, 
            (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
    }

    enter() {
    }
}

module.exports = Department;