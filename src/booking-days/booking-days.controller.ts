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
import { BookingDaysService } from "./booking-days.service";
import { BookingDay } from "./entities/booking-day.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { AuthGuard } from "../auth/auth-guard";

@UseGuards(AuthGuard)
@Controller("booking-days")
export class BookingDaysController {
  constructor(private readonly bookingService: BookingDaysService) {}

  @Get()
  async findAll(): Promise<BookingDay[]> {
    return this.bookingService.findAll();
  }

  @Get(":id")
  async findOne(
    // @Res() res: Response,
    @Param("id") id: string
  ): Promise<BookingDay> {
    return this.bookingService.findOne(id);
  }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }
}
