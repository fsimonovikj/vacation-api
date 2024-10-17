import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { PublicMethodsService } from "./public-methods.service";
import { UserStatus } from "../core/enums/user-status.enum";
import { Response } from "express";
import { generateToken } from "../users/user.utils";
import { BookingDaysService } from "../booking-days/booking-days.service";
import { BookingStatus } from "../booking-days/entities/booking-status.enum";
import { VacationService } from "../vacation/vacation.service";
import { UserService } from "../users/user.service";
import { CreateVacationPlanDto } from "../vacation-plan/dto/update-vacation-plan.dto";

import { approveEmail, bookEmail, rejectEmail } from "../email/utils";
import {
  APPROVED_RESPONSE_MESSAGE,
  BOOK_VACATION_EMAIL_SUBJECT,
  REJECTED_RESPONSE_MESSAGE,
  UNAUTHORIZED,
  USER_NOT_ACTIVE,
  USER_NOT_EXIST,
  USER_NOT_FOUND,
} from "../core/messages";
import { getLocalizedMessage } from "../core/utils/utils";
import { VacationPlanService } from "../vacation-plan/vacation-plan.service";
import { AuthGuard } from "../auth/auth-guard";

@Controller()
export class PublicMethodsController {
  constructor(
    private readonly publicMethodService: PublicMethodsService,
    private readonly userService: UserService,
    private readonly bookingService: BookingDaysService,
    private readonly vacationService: VacationService,
    private readonly vacationPlanService: VacationPlanService
  ) {}

  @Get("/login/:email")
  async webLoginStep1(@Param("email") email: string, @Res() res: Response) {
    try {
      const user = await this.publicMethodService.login(email);

      if (!user) {
        return res.status(401).end(getLocalizedMessage(USER_NOT_FOUND));
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
      return res.status(401).send(getLocalizedMessage(USER_NOT_EXIST));
    }

    if (user) {
      const token = await generateToken(user.id, req.email);
      if (user.status === UserStatus.Active) {
        if (user.password === req.password) {
          return res.status(200).send({ user, token });
        } else {
          return res.status(401).send(getLocalizedMessage(UNAUTHORIZED));
        }
      } else {
        return res.status(401).send(getLocalizedMessage(USER_NOT_ACTIVE));
      }
    }
  }

  @UseGuards(AuthGuard)
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
    const vacation = await this.vacationService.findOne(req.vacationId);

    if (vacation.days < req.bookedDays) {
      throw new Error("Not enough vacation days");
    }

    const sendEmail = async () => {
      console.log("Sending email...");
      try {
        await bookEmail({
          subject: getLocalizedMessage(BOOK_VACATION_EMAIL_SUBJECT),
          id: req.id,
          firstName: req.firstName,
          lastName: req.lastName,
          bookedDays: req.bookedDays,
          startAt: req.start,
          endAt: req.end,
          description: req.description,
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
    @Res() res: Response
  ) {
    try {
      const booking = await this.bookingService.approveBookingRequest(
        bookingId
      );

      const user = await this.userService.findUser(booking.userId);

      const vacation = await this.vacationService.findOne(booking.vacationId);

      const remainingDays = vacation.days - booking.bookedDays;

      await this.vacationService.update(vacation, {
        days: remainingDays,
        ...(remainingDays === 0 && { deletedAt: new Date() }),
      });

      await approveEmail({
        reciever: user.email,
        message: getLocalizedMessage(APPROVED_RESPONSE_MESSAGE),
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
        message: getLocalizedMessage(REJECTED_RESPONSE_MESSAGE),
      });

      return res.status(200).send(booking);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  // @UseGuards(AuthGuard)
  // @Post("/vacation-plan")
  // async createVacationPlan(
  //   @Body() req: CreateVacationPlanDto,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const plan = await this.vacationPlanService.create(req);

  //     return res.status(200).send(plan);
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // }
}
