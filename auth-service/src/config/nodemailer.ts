import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Verify the transporter
transporter.verify((err) => {
  if (err) {
    console.error("Error verifying transporter:", err);
    throw new Error("Failed to verify transporter");
  } else {
    console.log("Mail transporter is ready");
  }
});


export const sendEmail = async (
  receiverEmail: string,
  subject: string,
  htmlContent: string
) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: receiverEmail,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${receiverEmail}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};