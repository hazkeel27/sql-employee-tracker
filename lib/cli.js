const inquirer = require('inquirer');

const cli = () => {
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

module.exports = cli;