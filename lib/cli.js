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

module.exports = { mainCli, depCli };