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
                    tableData = await department.view();
                    break;
                case 'Add Department':
                    const newDepData = await cli.depCli();
                    tableData = await department.enter(newDepData.department);
                    break;
                case 'View All Roles':
                    tableData = await role.view();
                    break;
                case 'Add Role':
                    const getDepartments = await department.getDepartments();
                    try { 
                        const newRolData = await cli.rolCli(getDepartments); 
                        tableData = await role.enter(newRolData.role, newRolData.salary, newRolData.department);
                    } 
                    catch (error) { 
                        console.error(`Error Adding Role: ${error}`);
                    }
                    break;
                case 'View All Employees':
                    tableData = await employee.view();
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
                        const updateEmpData = await cli.empUpdateCli(getEmployees, getRoles); 
                        tableData = await employee.update(updateEmpData.updateEmployee, updateEmpData.newRole);
                    } 
                    catch (error) { 
                        console.error(`Error Updating Employee: ${error}`);
                    }
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
                console.error(`Error Vewing Table Data: ${error}`);
            }

        } catch (error) {
            console.error(`CLI Error: ${error}`);
        }
    }
};

askQuestions();
