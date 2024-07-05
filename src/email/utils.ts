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
  email: string;
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
    to: req.email,
    subject: req.subject,
    html: `
            <div style='text-align: center' >
            <h1>Vacation Booking Request</h1>
            <div style='text-align: center'>
              <div style='padding: 20px'>
                <div style='border: 2px solid grey'>
                  <h3 style='padding: 10px'>${req.firstName} ${req.lastName}</h3>
                </div>
              </div>
              <p>
              With this request, I submit a request to use annual leave from ${req.startAt} to ${req.endAt}</p>
              <p>Total days: ${req.bookedDays}</p>
              <p>Description:</p>
              <div style='border: 2px solid grey'>
               <p style='padding: 2px'>${req.description}</p>
              </div>
            </div>
            <div>
            <p>Please review and approve or reject this booking request.</p>
            <p>Click the following links to submit your response:</p>
            <a href='http://localhost:3000/approve?bookingId=${req.id}'>Approve</a>
            <a href="http://localhost:3000/reject?bookingId=${req.id}">Reject</a>
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
