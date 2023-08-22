// import libraries, files, and dependencies
const cli = require('./lib/cli');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');
require('dotenv').config();

const MySQL = require('mysql2');
const { table } = require('console');

// connection to database
const db = MySQL.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const department = new Department(db);
const role = new Role(db);
const employee = new Employee(db);

// switch statement for user to navigate the app
const askQuestions = async () => {
    // app runs forever untill user chooses 'Quit' option
    while (true) {
        try {
            // initial/main cli for the user
            const data = await cli.mainCli();
            // instances of the child classes returning arrays
            const getRoles = await role.getRoles();
            const getEmployees = await employee.getEmployees();
            const getDepartments = await department.getDepartments();

            let tableData;

            switch (data.choice) {
                case 'View All Departments':
                    try {
                        tableData = await department.view();
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error Viewing Departments: ${error}`);
                    }
                    break;

                case 'Add Department':
                    try {
                        const newDepData = await cli.depCli();
                        const result = await department.enter(newDepData.department);
                        console.info(result);
                    } 
                    catch (error) {
                        console.error(`Error Adding Department: ${error}`);
                    }
                    break;

                case 'View All Roles':
                    try {
                        tableData = await role.view();
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error Viewing Roles: ${error}`);
                    }
                    break;

                case 'Add Role':
                    try { 
                        const newRolData = await cli.rolCli(getDepartments); 
                        const result = await role.enter(newRolData.role, newRolData.salary, newRolData.department);
                        console.info(result);
                    } 
                    catch (error) { 
                        console.error(`Error Adding Role: ${error}`);
                    }
                    break;

                case 'View All Employees':
                    try {
                        tableData = await employee.view();
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error Viewing Employees: ${error}`);
                    }
                    break;

                case 'Add Employee':
                    try { 
                        const newEmpData = await cli.empCli(getRoles, getEmployees); 
                        const result = await employee.enter(newEmpData.firstname, newEmpData.lastname, newEmpData.role, newEmpData.manager);
                        console.info(result);
                    } 
                    catch (error) { 
                        console.error(`Error Adding Employee: ${error}`);
                    }
                    break;

                case 'Update Employee Role':
                    try { 
                        const updateEmpRole = await cli.empRolCli(getEmployees, getRoles); 
                        const result = await employee.updateRole(updateEmpRole.updateEmployee, updateEmpRole.newRole);
                        console.info(result);
                    } 
                    catch (error) { 
                        console.error(`Error Updating Employee Role: ${error}`);
                    }
                    break;

                case 'Update Employee Manager':
                    try { 
                        const updateEmpManager = await cli.empManCli(getEmployees, getEmployees); 
                        result = await employee.updateManager(updateEmpManager.updateEmployee, updateEmpManager.newManager);
                        console.info(result);
                    } 
                    catch (error) { 
                        console.error(`Error Updating Employee Manager: ${error}`);
                    }
                    break;

                case 'View Employees By Manager':
                    try {
                        const chosenManager = await cli.empByManagerCli(getEmployees); 
                        tableData = await employee.viewEmpByManager(chosenManager.manager);
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error Viewing ${chosenManager.manager}'s Employees: ${error}`);
                    }
                    break;

                case 'View Employees By Department':
                    try {
                        const chosenDepartment = await cli.empByDepartmentCli(getDepartments); 
                        tableData = await employee.viewEmpByDepartment(chosenDepartment.department);
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error Viewing ${chosenDepartment.department}'s Employees: ${error}`);
                    }
                    break;

                case 'Delete Department':
                    try {
                        const deleteDepartment = await cli.delDepCli(getDepartments); 
                        const result = await department.delete(deleteDepartment.department);
                        console.info(result);
                    } 
                    catch (error) {
                        console.error(`Error Deleting ${deleteDepartment.department}: ${error}`);
                    }
                    break;

                case 'Delete Role':
                    try {
                        const deleteRole = await cli.delRolCli(getRoles); 
                        const result = await role.delete(deleteRole.role);
                        console.info(result);
                    } 
                    catch (error) {
                        console.error(`Error Deleting ${deleteRole.role}: ${error}`);
                    }
                    break;

                case 'Delete Employee':
                    try {
                        const deleteEmployee = await cli.delEmpCli(getEmployees); 
                        const result = await employee.delete(deleteEmployee.employee);
                        console.info(result);
                    } 
                    catch (error) {
                        console.error(`Error Deleting ${deleteEmployee.employee}: ${error}`);
                    }
                    break;

                case 'View Department Budget':
                    try {
                        tableData = await department.depBudget();
                        console.table(tableData);
                    } 
                    catch (error) {
                        console.error(`Error View ${viewDepBudget.department}'s Total Utilized Budget: ${error}`);
                    }
                    break;

                case 'Quit':
                    console.log('Goodbye!');
                    return;

                default:
                    console.log('Invalid choice. Please select a valid option.');
            }
        } 
        catch (error) {
            console.error(`CLI Error: ${error}`);
        }
    }
};

// initiate the app
askQuestions();