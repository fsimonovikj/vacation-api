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
import { transporter } from "../email/configuration";
import { approveEmail, bookEmail, rejectEmail } from "../email/utils";

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
      description: string;
      start: Date;
      end: Date;
      allDay: boolean;
      bookedDays: number;
      user: string;
      firstName: string;
      lastName: string;
      status: BookingStatus;
      vacationId: string;
    }
  ) {
    const sendEmail = async () => {
      console.log("Sending email...");
      try {
        await bookEmail({
          subject: "Vacation Booking Request",
          id: req.id,
          firstName: req.firstName,
          lastName: req.lastName,
          bookedDays: req.bookedDays,
          startAt: req.start,
          endAt: req.end,
          description: req.description,
          vacationId: req.vacationId,
        });

        console.log(`Email sent successfully...`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    // // Function to send the vacation booking request email
    const sendBookingRequestEmail = async (bookingDetails) => {
      await sendEmail();
      // Create a Nodemailer transporter with your email provider's configuration
    };

    sendBookingRequestEmail(req);
  }

  @Get("/approve")
  async approveVacationRequest(
    @Query("bookingId") bookingId: string,
    @Query("vacationId") vacationId: string,
    @Res() res: Response
  ) {
    try {
      const booking = await this.bookingService.approveBookingRequest(
        bookingId
      );

      const user = await this.userService.findUser(booking.userId);
      const vacation = await this.vacationService.findVacationByIdAndDate(
        user.id,
        booking.start,
        vacationId
      );

      await this.vacationService.update(vacation[0], {
        days: vacation[0].days - booking.bookedDays,
      });

      await approveEmail({
        reciever: user.email,
        message: `Your vacation request is approved`,
      });

      return res.status(200).send(booking);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  @Get("/reject")
  async rejectVacationRequest(
    @Query("bookingId") bookingId: string,
    @Query("vacationId") vacationId: string,
    @Res() res: Response
  ) {
    try {
      const booking = await this.bookingService.rejectBookingRequest(bookingId);

      const user = await this.userService.findUser(booking.userId);

      await rejectEmail({
        reciever: user.email,
        message: `Your vacation request is rejected`,
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
