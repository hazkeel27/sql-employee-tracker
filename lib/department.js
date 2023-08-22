const Company = require('./company');

// child class of Company
class Department extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    // view departments
    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT 
                dep_id AS Id, 
                dep_name AS Department 
                FROM department`, 
            (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
    }

    // enter department
    enter(department) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT 
                INTO department (dep_name)
                VALUES ("${department}")`, 
            (error, result) => {
                error ? reject(error) : resolve(`SUCCESS: Added ${department} to the Department Table`);
            });
        });
    }

    // get a list of departments
    getDepartments() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT dep_name 
                FROM department`, 
            (error, result) => {
                error ? reject(error) : resolve(result.map((row) => row.dep_name));
            });
        });
    }
}

module.exports = Department;