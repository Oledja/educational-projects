import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

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

const sendMail = async (email: string, message: string) => {
  try {
    const mailOptions = {
      from: "Enternal AI",
      to: `${email}`,
      subject: "Eternal AI",
      text: `${message}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

export { sendMail };
