import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { User } from "../db/schema/schema";

dotenv.config();

const user = process.env.GOOGLE_MAIL_ACCOUNT;
const pass = process.env.GOOGLE_MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

const sendMail = async (
  email: string,
  name: User["name"] | null,
  code: string
) => {
  try {
    const userName = name ? name : email;
    const mailOptions = {
      from: "Enternal AI",
      to: `${email}`,
      subject: "Eternal AI",
      text: `Hello, ${userName}
A request has been received to change the password for your Eternal-AI account.
      
      Use this code to change your password
      code: ${code}
      
If you did not initiate this request, please ignore this message
      
Thank you,
The Eternal-AI Team`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

export { sendMail };
