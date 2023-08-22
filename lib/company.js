// parent class
class Company {
    view() {
        throw new Error(`Company class's children must implement view() method`);
    }

    enter() {
        throw new Error(`Company class's children must implement enter() method`);
    }

    // insert role_title and get role_id
    getDepartmentId(department) {
        return this.db.promise().query(`
            SELECT dep_id 
            FROM department 
            WHERE dep_name = "${department}"`)
        .then(result => {
            if (result[0].length === 0) {
                throw new Error(`Department '${department}' not found.`);
            }
            return result[0][0].dep_id;
        });
    }

    // insert role_title and get role_id
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

    // insert employee first_name, last_name and get emp_id
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
}

module.exports = Company;