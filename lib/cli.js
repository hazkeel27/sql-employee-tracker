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

const empCli = (roles, managers) => {
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
            choices: managers,
        }
    ];

    return inquirer.prompt(questions);
};



module.exports = { mainCli, depCli, rolCli , empCli};