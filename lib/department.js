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

    // delete department
    delete(department) {
        return new Promise(async (resolve, reject) => {

            const departmentId = await this.getDepartmentId(department);

            this.db.query(`
                DELETE FROM department 
                WHERE dep_id = ${departmentId}`,
            (error, result) => {
                error ? reject(error) : resolve(`SUCCESS: ${department} deleted`);
            });
        });
    }

    // view department's total utilized budget 
    depBudget() {
        return new Promise(async (resolve, reject) => {
            this.db.query(`
                SELECT department.dep_name AS Department, 
                SUM(role.role_salary) AS Total_Budget
                FROM department
                JOIN role ON department.dep_id = role.dep_id
                GROUP BY department.dep_id, department.dep_name;`,
            (error, result) => {
                error ? reject(error) : resolve(result);
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