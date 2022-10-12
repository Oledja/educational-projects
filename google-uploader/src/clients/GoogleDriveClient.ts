import { google } from "googleapis";
import getAuth from "../auth/GoogleDriveAuth";

class GoogleDriveClient {
  public async getDrive() {
    return google.drive({
      version: "v3",
      auth: await getAuth(),
    });
  }
}

export default GoogleDriveClient;
