import inquirer from 'inquirer';
import {saveUser, getUser} from "./repository/userRepository.js";


function main() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter the user\'s name. To cancel press ENTER: ',
            type: 'input',
        },
        {
            name: "gender",
            message: "Choose your gender: ",
            type: "list",
            choices: ["male", "female"],
            when: function(answers) {
                return answers.name !== "";
            }
        },
        {
            name: "age",
            message: "Enter your age",
            type: "input",
            validate: function(value) {
                if (!isNaN(value)) {
                    return true;
                }
                return `<${value}> can't be age. Pleace enter a valid age`
            },
            when: function(answers) {
                return answers.name !== "";
            }
        },
        {
            name: 'search',
            message: 'Would you to search user in DB?: ',
            type: 'confirm',
            when: function(answers) {
                return answers.name === "";
            }
        },
        {
            name: 'username',
            message: 'Enter username : ',
            type: 'input',
            when: function(answers) {
                return answers.search === true;
            }
        }
    ]).then(answers => {
        if (answers.name !== "") {
            saveUser({
                name: answers.name,
                gender: answers.gender,
                age: Number(answers.age)
            });
            main();
        } else {
            if (answers.search === true) {
                const users = getUser(answers.username)
                if (users.length === 0) {
                    console.log(`User with name ${answers.username} diesn't exist`);
                } else {
                    console.log(users);
                }    
                main();
            } else {
                return;
            }
        }
    })
}
main();