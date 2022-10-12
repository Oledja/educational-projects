import fs from "fs";
import GoogleDriveClient from "../clients/GoogleDriveClient";
import * as dotenv from "dotenv";
dotenv.config();

const googleDriveClient = new GoogleDriveClient();

class GoogleDriveService {
  public async saveImage(path: string, fileName: string) {
    const drive = await googleDriveClient.getDrive();
    try {
      return drive.files.create({
        requestBody: {
          parents: [process.env.PARENTS],
          name: fileName,
          mimeType: "image/json",
        },
        media: {
          mimeType: "image/json",
          body: fs.createReadStream(path),
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  public async getImage(imageId: string) {
    const drive = await googleDriveClient.getDrive();
    const {
      data: { webViewLink: link },
    } = await drive.files.get({
      fileId: imageId,
      fields: "webViewLink",
    });
    if (link) return link;
    throw new Error("Image doesn't exist");
  }
}

export default GoogleDriveService;
