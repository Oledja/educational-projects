import inquirer from "inquirer";
import { getImageName, getShortLink } from "./util/util";
import GoogleDriveService from "./services/GoogleDriveService";

const main = async () => {
  const googleDriveService = new GoogleDriveService();
  const { path } = await inquirer.prompt([
    {
      name: "path",
      message: "Drag and drop image to terminal and press Enter for upload: ",
      type: "text",
    },
  ]);

  let imageName = getImageName(path);
  const { isChangeName, newName } = await inquirer.prompt([
    {
      name: "isChangeName",
      message: `Current image name "${imageName}" \nDo you want change it?`,
      type: "list",
      choices: ["yes", "no"],
    },
    {
      name: "newName",
      message: "Enter new name ",
      type: "text",
      when: (answers) => {
        return answers.isChangeName === "yes";
      },
    },
  ]);

  if (isChangeName === "yes") {
    imageName = newName;
  }
  try {
    const result = await googleDriveService.saveImage(path, imageName);
    const { isShortLink } = await inquirer.prompt({
      name: "isShortLink",
      message: `Would you like to shortem you link?`,
      type: "list",
      choices: ["yes", "no"],
    });
    if (isShortLink === "yes") {
      const {
        data: { id: imageId },
      } = result;
      if (imageId) {
        try {
          const link = await googleDriveService.getImage(imageId);
          const shortLink = await getShortLink(link);
          console.log(`Your short link is ${shortLink}`);
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          }
        }
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

main();
