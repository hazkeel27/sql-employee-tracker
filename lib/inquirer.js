const inquirer = require('inquirer');

const cli = () => {
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',   
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role'
            ],
        },
    ];

    return inquirer.prompt(questions);
};

module.exports = cli;