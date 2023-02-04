import fs from "fs";
import GoogleDriveClient from "../clients/GoogleDriveClient";
import * as dotenv from "dotenv";
dotenv.config();

class GoogleDriveService {
  private googleDriveClient = new GoogleDriveClient();

  public async saveImage(path: string, fileName: string) {
    const drive = await this.googleDriveClient.getDrive();
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
      throw new Error("Image was not saved");
    }
  }

  public async getImage(imageId: string) {
    const drive = await this.googleDriveClient.getDrive();
    if (drive) {
      const {
        data: { webViewLink: link },
      } = await drive.files.get({
        fileId: imageId,
        fields: "webViewLink",
      });
      if (link) return link;
    } else {
    }
    throw new Error("Image doesn't exist");
  }
}

export default GoogleDriveService;
