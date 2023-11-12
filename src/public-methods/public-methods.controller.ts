import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { PublicMethodsService } from "./public-methods.service";
import { UserStatus } from "../core/enums/user-status.enum";
import { Response } from "express";
import { generateToken } from "../users/user.utils";
import { BookingDaysService } from "../booking-days/booking-days.service";
import { BookingStatus } from "../booking-days/entities/booking-status.enum";
import { VacationService } from "../vacation/vacation.service";
import { UserService } from "../users/user.service";
import { CreateVacationSolutionDto } from "../vacation-solution/dto/update-vacation-solution.dto";
import { VacationSolutionService } from "../vacation-solution/entities/vacation-solution.service";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  port: 587, // port for secure SMTP
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

@Controller()
export class PublicMethodsController {
  constructor(
    private readonly publicMethodService: PublicMethodsService,
    private readonly userService: UserService,
    private readonly bookingService: BookingDaysService,
    private readonly vacationService: VacationService,
    private readonly vacationSolutionService: VacationSolutionService
  ) {}

  @Get("/login/:email")
  async webLoginStep1(@Param("email") email: string, @Res() res: Response) {
    try {
      const user = await this.publicMethodService.login(email);

      if (!user) {
        return res.status(401).end(`User not found`);
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post("/login")
  async postWebLoginStep1(
    @Body()
    req: {
      email: string;
      password?: any;
    },
    @Res() res: Response
  ) {
    const user = await this.publicMethodService.login(req.email);

    if (!user) {
      return res.status(401).send("User is not exist");
    }

    if (user) {
      const token = await generateToken(user.id, req.email);
      if (user.status === UserStatus.Active) {
        if (user.password === req.password) {
          return res.status(200).send({ user, token });
        } else {
          return res.status(401).send("Unauthorized");
        }
      } else {
        return res.status(401).send("User is not activated");
      }
    }
  }

  @Post("/booking-requests")
  async createBookingRequest(
    @Body()
    req: {
      id: string;
      title: string;
      start: Date;
      end: Date;
      allDay: boolean;
      bookedDays: number;
      user: string;
      firstName: string;
      lastName: string;
      status: BookingStatus;
    },
    @Res() res: Response
  ) {
    console.log(`req.body: `, req.user);
    console.log(`req.body: `, req);

    const sendEmail = async () => {
      console.log("Sending email...");
      try {
        // Send email
        const info = await transporter.sendMail({
          from: "filip_simonovik@hotmail.com",
          to: "filip@mozok.de",
          subject: "Test Email",
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
              With this request, I submit a request to use annual leave from ${req.start} to ${req.end}</p>
              <p>Total days: ${req.bookedDays}</p>
              <p>Description:</p>
              <div style='border: 2px solid grey'>
               <p style='padding: 2px'>${req.title}</p>
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

        console.log("Email sent:", info.messageId);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    // // Function to send the vacation booking request email
    const sendBookingRequestEmail = async (bookingDetails) => {
      console.log(bookingDetails);
      await sendEmail();
      // Create a Nodemailer transporter with your email provider's configuration
    };

    sendBookingRequestEmail(req);
  }

  @Get("/approve")
  async approveVacationRequest(
    @Query("bookingId") bookingId: string,
    @Res() res: Response
  ) {
    try {
      const booking = await this.bookingService.approveBookingRequest(
        bookingId
      );

      console.log(`BOOKING`, booking);

      console.log(`before user`);
      console.log(`userId: `, booking.userId);
      const user = await this.userService.findUser(booking.userId);
      const vacation = await this.vacationService.findVacationByDate(
        user.id,
        booking.start
      );

      console.log(`Vacation`, vacation[0]);

      await this.vacationService.update(vacation[0], {
        days: vacation[0].days - booking.bookedDays,
      });

      return res.status(200).send(booking);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  @Post("/vacation-solution")
  async createVacationSolution(
    @Body() req: CreateVacationSolutionDto,
    @Res() res: Response
  ) {
    try {
      const vacationSolution = await this.vacationSolutionService.create(req);

      return res.status(200).send(vacationSolution);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
