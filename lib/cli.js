const inquirer = require('inquirer');

// initial cli
const mainCli = () => {
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',   
            choices: [
                'View All Departments',
                'Add Department',
                'View All Roles',
                'Add Role',
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View Employees By Manager',
                'View Employees By Department',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View Department Budget',
                'Quit'
            ]
        }
    ];

    return inquirer.prompt(questions);
};

// create department cli
const depCli = () => {
    const questions = [
        {
            type: 'input',
            message: 'Enter New Department: ',
            name: 'department',
        }
    ];

    return inquirer.prompt(questions);
};

// create role cli
const rolCli = (departments) => {
    const questions = [
        {
            type: 'input',
            message: 'Enter New Role: ',
            name: 'role',
        },
        {
            type: 'input',
            message: 'Enter Role Salary: ',
            name: 'salary',
        },
        {
            type: 'list',
            message: `Choose Role's Department:  `,
            name: 'department',
            choices: departments,
        }
    ];

    return inquirer.prompt(questions);
};

// create employee cli
const empCli = (roles, employees) => {
    employees.unshift('None');

    const questions = [
        {
            type: 'input',
            message: 'Enter Firstname: ',
            name: 'firstname',
        },
        {
            type: 'input',
            message: 'Enter Lastname: ',
            name: 'lastname',
        },
        {
            type: 'list',
            message: `Choose Employee's Role:  `,
            name: 'role',
            choices: roles,
        },
        {
            type: 'list',
            message: `Choose Employee's Manager:  `,
            name: 'manager',
            choices: employees,
        }
    ];

    return inquirer.prompt(questions);
};

// update employee's role cli
const empRolCli = (employees, roles) => {
    const questions = [
        {
            type: 'list',
            message: `Choose an Employee to Update:  `,
            name: 'updateEmployee',
            choices: employees,
        },
        {
            type: 'list',
            message: `Choose Employee's New Role:  `,
            name: 'newRole',
            choices: roles,
        }
    ];

    return inquirer.prompt(questions);
};

// update employee's manager cli
const empManCli = (employees, managers) => {
    const questions = [
        {
            type: 'list',
            message: `Choose an Employee to Update:  `,
            name: 'updateEmployee',
            choices: employees,
        },
        {
            type: 'list',
            message: `Choose Employee's New Manager:  `,
            name: 'newManager',
            choices: managers,
        }
    ];

    return inquirer.prompt(questions);
};

// view employee by manager cli
const empByManagerCli = (managers) => {
    const questions = [
        {
            type: 'list',
            message: `Choose Manager to View Employees:  `,
            name: 'manager',
            choices: managers,
        }
    ];

    return inquirer.prompt(questions);
};

// view employee by department cli
const empByDepartmentCli = (departments) => {
    const questions = [
        {
            type: 'list',
            message: `Choose Department to View Employees:  `,
            name: 'department',
            choices: departments,
        }
    ];

    return inquirer.prompt(questions);
};

// delete department cli
const delDepCli = (departments) => {
    const questions = [
        {
            type: 'list',
            message: `Choose Department to Delete:  `,
            name: 'department',
            choices: departments,
        }
    ];

    return inquirer.prompt(questions);
};

// delete role cli
const delRolCli = (roles) => {
    const questions = [
        {
            type: 'list',
            message: `Choose Role to Delete:  `,
            name: 'role',
            choices: roles,
        }
    ];

    return inquirer.prompt(questions);
};

// delete employee cli
const delEmpCli = (employees) => {
    const questions = [
        {
            type: 'list',
            message: `Choose Employee to Delete:  `,
            name: 'employee',
            choices: employees,
        }
    ];

    return inquirer.prompt(questions);
};

// exports
module.exports = { 
    mainCli, 
    depCli, 
    rolCli, 
    empCli, 
    empRolCli,
    empManCli,
    empByManagerCli,
    empByDepartmentCli,
    delDepCli,
    delRolCli,
    delEmpCli
};