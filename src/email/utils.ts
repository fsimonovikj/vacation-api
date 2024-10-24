import apiConfig from "../config/configurations";
import configurations from "../config/configurations";
import {
  APPROVED_VACATION,
  BOOK_APPROVE_BUTTON,
  BOOK_EXPLANATION_BUTTON,
  BOOK_EXPLANATION_FIRST,
  BOOK_EXPLANATION_SECOND,
  BOOK_REJECT_BUTTON,
  BOOK_VACATION_DAYS,
  BOOK_VACATION_EMAIL_SUBJECT,
  DESCRIPTION,
  REJECTED_VACATION,
} from "../core/messages";
import { getLocalizedMessage } from "../core/utils/utils";
import { recieverEmail, senderEmail, transporter } from "./configuration";
// import emailjs from "emailjs-com";
const emailjs = require("emailjs-com");

interface IEmail {
  subject: string;
  id: string;
  firstName: string;
  lastName: string;
  bookedDays: number;
  startAt: Date;
  endAt: Date;
  description: string;
}

interface IApproveEmail {
  reciever: string;
  message: string;
}

interface IRejectEmail {
  reciever: string;
  message: string;
}

export const bookEmail = async (req: IEmail) => {
  await transporter.sendMail({
    from: senderEmail,
    to: recieverEmail,
    subject: req.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; font-size: 24px; margin: 0;">ODMORCO</h1>
          <h2 style="color: #333;">Vacation Request</h2>
        </div>
        <p>Hello Admin,</p>
        <p>${req.firstName} ${req.lastName} has requested vacation leave:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Start Date:</strong> ${req.startAt}</p>
          <p><strong>End Date:</strong> ${req.endAt}</p>
          <p><strong>Days Requested:</strong> ${req.bookedDays}</p>
          <p><strong>Description:</strong> ${req.description}</p>
        </div>
        <p>Please review the request and take the appropriate action:</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${apiConfig.apiBaseUrl}/approve?bookingId=${req.id}" style="background-color: #28a745; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Approve</a>
          <a href="${apiConfig.apiBaseUrl}/reject?bookingId=${req.id}" style="background-color: #dc3545; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reject</a>
        </div>
        <p style="margin-top: 30px;">If you did not expect this email, please ignore it.</p>
        <footer style="margin-top: 30px; text-align: center; color: #888;">
          <p>© 2024 ODMORCO Inc.</p>
          <p><a href="https://odmorco.com/terms" style="color: #888;">Terms</a> | <a href="https://odmorco.com/privacy" style="color: #888;">Privacy</a> | <a href="https://odmorco.com/about" style="color: #888;">About</a></p>
        </footer>
      </div>
    `,
    text: "Annual leave request.",
  });
};

export const approveEmail = async (req: IApproveEmail) => {
  await transporter.sendMail({
    from: senderEmail,
    to: req.reciever,
    subject: getLocalizedMessage(APPROVED_VACATION),
    html: `
                <div style='text-align: center' >
                <h1>${getLocalizedMessage(APPROVED_VACATION)}</h1>
                <div style='text-align: center'>
                <div style='padding: 20px'>
                    <div style='border: 2px solid grey'>
                    <h3 style='padding: 10px'>${req.message}</h3>
                    </div>
                </div>
                <p>
                ${req.reciever}
                </p>
                </div>
                </div>
            `,
    text: "Annual leave request.",
  });
};

export const rejectEmail = async (req: IRejectEmail) => {
  await transporter.sendMail({
    from: senderEmail,
    to: req.reciever,
    subject: getLocalizedMessage(REJECTED_VACATION),
    html: `
                <div style='text-align: center' >
                <h1>${getLocalizedMessage(REJECTED_VACATION)}</h1>
                <div style='text-align: center'>
                <div style='padding: 20px'>
                    <div style='border: 2px solid grey'>
                    <h3 style='padding: 10px'>${req.message}</h3>
                    </div>
                </div>
                <p>
                ${req.reciever}
                </p>
                </div>
                </div>
            `,
    text: "Annual leave request.",
  });
};
