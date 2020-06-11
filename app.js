const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var engineeringTeam = [];

const engineerPrompt = [
    {
        type: "input",
        name: "engineerName",
        message: "Enter the Engineer's Name.",
        default: "Bilbo Baggins"
    },
    {
        type: "number",
        name: "engineerId",
        message: "Enter the Engineer's ID.",
        default: 2
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Please enter Engineer's E-mail.",
        default: "bilbo@baggins.com"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Enter the Engineer's Github.",
        default: "BBaggins420"
    }
];

const internPrompt = [
    {
        type: "input",
        name: "internName",
        message: "Enter the Intern's Name.",
        default: "Frodo Baggins"
    },
    {
        type: "number",
        name: "internId",
        message: "Enter the Intern's ID.",
        default: 3
    },
    {
        type: "input",
        name: "internEmail",
        message: "Enter the Intern's E-mail.",
        default: "frodo@baggins.com"
    },
    {
        type: "input",
        name: "internSchool",
        message: "Enter the Intern's School.",
        default: "Shire University"
    }
];

const managerPrompt = [
    {
        type: "input",
        name: "managerName",
        message: "Enter the Manager's Name.",
        default: "Gandalf the Gray"
    },
    {
        type: "number",
        name: "managerId",
        message: "Enter the Manager's ID.",
        default: 1
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter the Manager's E-mail.",
        default: "gandalf@gray.com"
    },
    {
        type: "number",
        name: "officeNumber",
        message: "Enter the Manager's Office Number.",
        default: 69
    }
];

const rolePrompt = [
    {
        type: "rawlist",
        name: "employee",
        message: "Please select an employee role to add.",
        choices: ["Engineer", "Intern", "no more to add"]
    }
];

init();

function init() {
    inquirer.prompt(managerPrompt).then(answers => {
        var newEmployee = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
        engineeringTeam.push(newEmployee);
        teamPrompts();
    });
}

function teamPrompts() {
    inquirer.prompt(rolePrompt).then(answers => {
        if (answers.employee === "Engineer") {
            inquirer.prompt(engineerPrompt).then(answers => {
                var newEmployee = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                engineeringTeam.push(newEmployee);
                teamPrompts();
            });
        } else if (answers.employee === "Intern") {
            inquirer.prompt(internPrompt).then(answers => {
                var newEmployee = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                engineeringTeam.push(newEmployee);
                teamPrompts();
            });
        } else {
            var teamHtml = render(engineeringTeam);
            writeToFile(OUTPUT_DIR, outputPath, teamHtml);
        }
    });
}

function writeToFile(directory, fileName, data) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
          }
   fs.writeFile(fileName, data, function(err){
       if(err){
           return console.log(err);    
       }
   });
}
