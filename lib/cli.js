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
            name: 'newDep',
        }
    ];

    return inquirer.prompt(questions);
};

const rolCli = (departments) => {
    const questions = [
        {
            type: 'input',
            message: 'Enter New Role: ',
            name: 'newRol',
        },
        {
            type: 'input',
            message: 'Enter Role Salary: ',
            name: 'newRolSal',
        },
        {
            type: 'list',
            message: `Choose Role's Department:  `,
            name: 'newRolDep',
            choices: departments,
        }
    ];

    return inquirer.prompt(questions);
};



module.exports = { mainCli, depCli, rolCli };