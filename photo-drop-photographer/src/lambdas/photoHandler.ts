// import { S3Event } from "aws-lambda";
// // import { S3Service } from "../services/S3Service";
// import sharp from "sharp";
// import * as dotenv from "dotenv";
// import AWS from "aws-sdk";

// dotenv.config();
// const region = process.env.REGION;
// const bucketName = process.env.AWS_S3_BUCKET_NAME;
// const s3 = new AWS.S3({ region, signatureVersion: "v4" });
// // const s3Service = new S3Service();

// export const photoHandler = async (event: S3Event) => {
//   try {
//     const params = {
//       Bucket: bucketName,
//       Key: event.Records[0].s3.object.key,
//     };
//     const image = await s3.getObject(params).promise();

//     const res = await sharp(Buffer.from(image.Body.toString()))
//       .resize(400, 400)
//       .png()
//       .toBuffer();
//     console.log(res);

//     // const {
//     //   s3: {
//     //     object: { key },
//     //   },
//     // } = event.Records[0];
//     // const keyWithoutPrefix = key.split("/")[1];
//     // const { Body: image } = await s3Service.getPhoto(key);
//     // await s3Service.savePhotosForService(image as Buffer, keyWithoutPrefix);
//   } catch (err) {
//     console.log(err);
//   }
// };
