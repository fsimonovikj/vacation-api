import apiConfig from "../config/configurations";
import configurations from "../config/configurations";
import {
  BOOK_EXPLANATION_FIRST,
  BOOK_VACATION_EMAIL_SUBJECT,
} from "../core/messages";
import { recieverEmail, senderEmail, transporter } from "./configuration";

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
            <div style='text-align: center' >
            <h1>${getLocalizedMessage(BOOK_VACATION_EMAIL_SUBJECT)}</h1>
            <div style='text-align: center'>
              <div style='padding: 20px'>
                <div style='border: 2px solid grey'>
                  <h3 style='padding: 10px'>${req.firstName} ${
      req.lastName
    }</h3>
                </div>
              </div>
              <p>
              ${getLocalizedMessage(BOOK_EXPLANATION_FIRST)} ${req.startAt} - ${
      req.endAt
    }</p>
              <p>Total days: ${req.bookedDays}</p>
              <p>Description:</p>
              <div style='border: 2px solid grey'>
               <p style='padding: 2px'>${req.description}</p>
              </div>
            </div>
            <div>
            <p>Please review and approve or reject this booking request.</p>
            <p>Click the following links to submit your response:</p>
            <a href='${apiConfig.apiBaseUrl}/approve?bookingId=${
      req.id
    }'>Approve</a>
            <a href="${apiConfig.apiBaseUrl}/reject?bookingId=${
      req.id
    }">Reject</a>
            </div>
            </div>
          `,
    text: "Annual leave request.",
  });
};

export const approveEmail = async (req: IApproveEmail) => {
  await transporter.sendMail({
    from: senderEmail,
    to: req.reciever,
    subject: "Approved Vacation Booking Request",
    html: `
                <div style='text-align: center' >
                <h1>Vacation Booking Request</h1>
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
    subject: "Rejected Vacation Booking Request",
    html: `
                <div style='text-align: center' >
                <h1>Vacation Booking Request</h1>
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
