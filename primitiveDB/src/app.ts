import inquirer, { Answers } from "inquirer";
import UserRepository from "./repository/UserRepository.js";

const userRepository = new UserRepository();

function main() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Enter the user's name. To cancel press ENTER: ",
        type: "input",
      },
      {
        name: "gender",
        message: "Choose your gender: ",
        type: "list",
        choices: ["male", "female"],
        when: (answers: Answers) => {
          return answers.name;
        },
      },
      {
        name: "age",
        message: "Enter your age",
        type: "input",
        validate: (value: number) => {
          if (!isNaN(value)) return true;
          return `<${value}> can't be age. Pleace enter a valid age`;
        },
        when: function (answers: Answers) {
          return answers.name;
        },
      },
      {
        name: "search",
        message: "Would you to search user in DB?: ",
        type: "confirm",
        when: (answers: Answers) => {
          return !answers.name;
        },
      },
      {
        name: "username",
        message: "Enter username : ",
        type: "input",
        when: (answers: Answers) => {
          return answers.search;
        },
      },
    ])
    .then((answers) => {
      if (answers.name) {
        userRepository.saveUser({
          name: answers.name,
          gender: answers.gender,
          age: parseInt(answers.age),
        });
        main();
      } else {
        if (answers.search) {
          const user = userRepository.getUser(answers.username);
          if (!user) {
            console.log(`User with name ${answers.username} diesn't exist`);
          } else console.log(user);
          main();
        }
        return;
      }
    });
}
main();
