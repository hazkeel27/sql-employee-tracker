const inquirer = require('inquirer');

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
                'Quit'
            ]
        }
    ];

    return inquirer.prompt(questions);
};

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



module.exports = { 
    mainCli, 
    depCli, 
    rolCli, 
    empCli, 
    empRolCli,
    empManCli
};