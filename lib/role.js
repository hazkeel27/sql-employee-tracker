const Company = require('./company');

// child class of Company
class Role extends Company {
    constructor(db) {
        super();
        this.db = db;
    }

    // view roles
    view() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                role.role_id AS Id,
                role.role_title AS Title,
                department.dep_name AS Department,
                role.role_salary AS Salary
                FROM role
                JOIN department ON role.dep_id = department.dep_id
                ORDER BY role.role_id`, 
            (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
    }

    // enter role
    enter(role, salary, department) {
        return new Promise(async (resolve, reject) => {

            const departmentId = await this.getDepartmentId(department);

            this.db.query(`
                INSERT 
                INTO role (role_title, role_salary, dep_id)
                VALUES ("${role}", ${salary}, ${departmentId})`, 
            (error, result) => {
                error ? reject(error) : resolve(`SUCCESS: Added ${role} ($${salary}) to the Role Table`);
            });
        });
    }

    // delete role
    delete(role) {
        return new Promise(async (resolve, reject) => {

            const roleId = await this.getRoleId(role);

            this.db.query(`
                DELETE FROM role 
                WHERE role_id = ${roleId}`,
            (error, result) => {
                error ? reject(error) : resolve(`SUCCESS: ${role} deleted`);
            });
        });
    }

    // get a list of roles
    getRoles() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT role_title 
                FROM role`, 
            (error, result) => {
                error ? reject(error) : resolve(result.map((row) => row.role_title));
            });
        });
    }

}

module.exports = Role;