import { google } from "googleapis";
import inquirer from "inquirer";
import Client from "./client"
import credentials from "./keys/credentials";
import Service from "./service";
import { getImageName, getShortLink } from "./util";

const oAuth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uri
);


async function main() {
    const client: Client = new Client(oAuth2Client);
    const auth = await client.getAuth();
    const driveService = new Service(auth);
    
    const imagePath = await inquirer.prompt([
        {
            name: "path",
            message: "Drag and drop image to terminal and press Enter for upload: ",
            type: "text",
        }
    ]);
    let imageName: string = getImageName(imagePath.path);
    
    const changeName = await inquirer.prompt([
        {
            name: "changeName",
            message: `current image name "${imageName}" \nDo you want change it?`,
            type: "list",
            choices: ["yes", "no"]
        },
        {
            name: "newName",
            message: "Enter new name ",
            type: "text",
            when: function(answers) {
                return answers.changeName === "yes";
            }
        }
    ])
    
    if (changeName.changeName === "yes") {
        imageName = changeName.newName;
    }

    const result = await driveService.saveImage(imagePath.path, imageName);

    const isShortLink = await inquirer.prompt(
        {
            name: "shortLink",
            message: `Would you like to shortem you link?`,
            type: "list",
            choices: ["yes", "no"]
        });

    if (isShortLink.shortLink === "yes") {
        const imageId = result?.data.id;
        if (imageId) {
            const link = (await driveService.getImage(imageId)).data.webViewLink;
            if (link) {
                const shortLink = (await getShortLink(link)).data.tiny_url;
                console.log(`Your short link is ${shortLink}`);
            }
        }
    }  
}

main();  



