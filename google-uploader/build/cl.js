"use strict";
// import { OAuth2Client } from "google-auth-library";
// import keys from "./keys/client-secret.js";
// import { google } from "googleapis";
// const service = google.drive({
//     version: "v3",
//     auth: oAuth2Client
// })
//     try {    
//         const response = await service.files.create({
// requestBody: {
//                 parents: ["1hYXI4w3hceW-fyvT2ger6vzKZgKh_4wp"],
//                 name: "first.jpg",
//                 mimeType: "image/json",
//             },
//             media: {
//                 mimeType: "image/json",
//                 body: fs.createReadStream("C:\\Users\\12345\\Desktop\\lambda-tasks\\google-uploader\\src\\files\\photo.JPG")
//             }
//         })
//         console.log(response.data);
//     } catch (err) {
//         if (err instanceof Error) {
//             console.log(err.message);
//         }
//     }
// oAuth2Client.on('tokens', (tokens) => {
//     if (tokens.refresh_token) {
//         console.log("TOKENS");
//         fs.writeFileSync("./keys/token.txt", tokens.refresh_token, "utf-8");
//         console.log("refresh TOKEN " + tokens.refresh_token);
//     }
//     console.log("Access TOKEN " + tokens.access_token);
// });
