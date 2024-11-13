const nodemailer = require("nodemailer");

export const senderEmail = "request.booking.vacation@gmail.com";
export const recieverEmail = "filip@k.net.mk";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true, // enforcing secure transfer
  auth: {
    user: senderEmail,
    pass: `lwaeufgjjrwzaxld`,
  },
});
