const nodemailer = require("nodemailer");

export const senderEmail = "booking-vacation@hotmail.com";
export const recieverEmail = "filip@mozok.de";

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  port: 587, // port for secure SMTP
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "booking-vacation@hotmail.com",
    pass: "pass4Vacation",
  },
});
