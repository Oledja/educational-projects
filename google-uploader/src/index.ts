import inquirer from "inquirer";
import { getImageName, getShortLink } from "./utill/util";
import GoogleDriveService from "./services/GoogleDriveService";

const main = async () => {
  const googleDriveService = new GoogleDriveService();
  const imagePath = await inquirer.prompt([
    {
      name: "path",
      message: "Drag and drop image to terminal and press Enter for upload: ",
      type: "text",
    },
  ]);

  let imageName: string = getImageName(imagePath.path);
  const isChangeName = await inquirer.prompt([
    {
      name: "changeName",
      message: `current image name "${imageName}" \nDo you want change it?`,
      type: "list",
      choices: ["yes", "no"],
    },
    {
      name: "newName",
      message: "Enter new name ",
      type: "text",
      when: (answers) => {
        return answers.changeName === "yes";
      },
    },
  ]);

  if (isChangeName.changeName === "yes") {
    imageName = isChangeName.newName;
  }

  const result = await googleDriveService.saveImage(imagePath.path, imageName);
  const isShortLink = await inquirer.prompt({
    name: "shortLink",
    message: `Would you like to shortem you link?`,
    type: "list",
    choices: ["yes", "no"],
  });

  if (isShortLink.shortLink === "yes") {
    const imageId = result!.data.id!;
    const link = await googleDriveService.getImage(imageId);
    const shortLink = await getShortLink(link);
    console.log(`Your short link is ${shortLink}`);
  }
};

main();
