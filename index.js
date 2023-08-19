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
            let tableData;

            switch (data.choice) {
                case 'View All Departments':
                    tableData = await department.view();
                    break;
                case 'Add Department':
                    const newDepData = await cli.depCli();
                    tableData = await department.enter(newDepData.newDep);
                    break;
                case 'View All Roles':
                    tableData = await role.view();
                    break;
                case 'Add Role':
                    const getDep = await role.getDepartments();
                    try { 
                        const newRolData = await cli.rolCli(getDep); 
                        tableData = await role.enter(newRolData.newRol, newRolData.newRolSal, newRolData.newRolDep);
                    } 
                    catch (error) { console.error(`Error Getting Departments: ${error}`); }
                    break;
                case 'View All Employees':
                    tableData = await employee.view();
                    break;
                case 'Add Employee':
                    break;
                case 'Update Employee Role':
                    break;
                case 'Quit':
                    console.log('Goodbye!');
                    return;
                default:
                    console.log('Invalid choice. Please select a valid option.');
            }

            try {
                console.table(tableData);
            } catch (error) {
                console.error('An error occurred:', error);
            }

        } catch (error) {
            console.error(`CLI Error: ${error}`);
        }
    }
};

askQuestions();
