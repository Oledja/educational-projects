import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getUser(username) {
    const allUsers = getAllUser();
    return allUsers.filter(user => user.name === username);
}

export function saveUser(user) {
    try {
        fs.appendFileSync(__dirname + "\\userDB.txt", JSON.stringify(user) + "\n");
    } catch (err) {
        console.log(err);
    }
}

function getAllUser() {
    try {
        let allUsersFromDB = fs.readFileSync(__dirname + "\\userDB.txt", "utf-8").split("\n");
        let allUsers = [];
        for (let i = 0; i < allUsersFromDB.length; i++) {
            if (allUsersFromDB[i] !== "") {
                allUsers.push(JSON.parse(allUsersFromDB[i]));
            }
        }
        return allUsers;
    } catch (err) {
        console.log(err);
    }
}




    