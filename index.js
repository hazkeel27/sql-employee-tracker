const cli = require('./lib/cli');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

const MySQL = require('mysql2');
const { table } = require('console');

const db = MySQL.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '394377394377cR7&',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const department = new Department(db);
const role = new Role(db);
const employee = new Employee(db);

const askQuestions = async () => {
    while (true) {
        try {
            const data = await cli.mainCli();
            const getRoles = await role.getRoles();
            const getEmployees = await employee.getEmployees();

            let tableData;

            switch (data.choice) {
                case 'View All Departments':
                    try {
                        tableData = await department.view();
                        console.table(tableData);
                    } catch (error) {
                        console.error(`Error Viewing Departments: ${error}`);
                    }
                    break;
                case 'Add Department':
                    try {
                        const newDepData = await cli.depCli();
                        await department.enter(newDepData.department);
                    } catch (error) {
                        console.error(`Error Adding Department: ${error}`);
                    }
                    break;
                case 'View All Roles':
                    try {
                        tableData = await role.view();
                        console.table(tableData);
                    } catch (error) {
                        console.error(`Error Viewing Roles: ${error}`);
                    }
                    break;
                case 'Add Role':
                    try { 
                        const getDepartments = await department.getDepartments();
                        const newRolData = await cli.rolCli(getDepartments); 
                        tableData = await role.enter(newRolData.role, newRolData.salary, newRolData.department);
                    } 
                    catch (error) { 
                        console.error(`Error Adding Role: ${error}`);
                    }
                    break;
                case 'View All Employees':
                    try {
                        tableData = await employee.view();
                        console.table(tableData);
                    } catch (error) {
                        console.error(`Error Viewing Employees: ${error}`);
                    }
                    break;
                case 'Add Employee':
                    try { 
                        const newEmpData = await cli.empCli(getRoles, getEmployees); 
                        tableData = await employee.enter(newEmpData.firstname, newEmpData.lastname, newEmpData.role, newEmpData.manager);
                    } 
                    catch (error) { 
                        console.error(`Error Adding Employee: ${error}`);
                    }
                    break;
                case 'Update Employee Role':
                    try { 
                        const updateEmpRole = await cli.empRolCli(getEmployees, getRoles); 
                        tableData = await employee.updateRole(updateEmpRole.updateEmployee, updateEmpRole.newRole);
                    } 
                    catch (error) { 
                        console.error(`Error Updating Employee Role: ${error}`);
                    }
                    break;
                case 'Update Employee Manager':
                    try { 
                        const updateEmpManager = await cli.empManCli(getEmployees, getEmployees); 
                        await employee.updateManager(updateEmpManager.updateEmployee, updateEmpManager.newManager);
                    } 
                    catch (error) { 
                        console.error(`Error Updating Employee Manager: ${error}`);
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

askQuestions();
