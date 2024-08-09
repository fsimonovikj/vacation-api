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
import { BookingDaysService } from "../booking-days/booking-days.service";
import { VacationDay } from "./entities/vacation.entity";
import { BookingDay } from "../booking-days/entities/booking-day.entity";
import { CreateVacationDto } from "./dto/create-vacation.dto";
import { VacationService } from "./vacation.service";
import { UserService } from "../users/user.service";
import { AuthGuard } from "../auth/auth-guard";

@UseGuards(AuthGuard)
@Controller("vacation")
export class VacationController {
  constructor(
    private readonly vacationService: VacationService,
    private readonly userService: UserService
  ) {}

  @Get()
  async findAll(): Promise<VacationDay[]> {
    return this.vacationService.findAll();
  }

  @Get("lists")
  async findLists() {
    const vacations = await this.vacationService.findAll();
    const data = [];

    for (const vacation of vacations) {
      const user = await this.userService.findUserById(vacation.userId);
      data.push({
        id: vacation.id,
        title: vacation.title,
        days: vacation.days,
        startAt: vacation.startAt,
        endAt: vacation.endAt,
        userId: vacation.userId,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }

    return data;
  }

  @Get(":id")
  async findByUserId(@Param("id") id: string): Promise<VacationDay[]> {
    return this.vacationService.findByUserId(id);
  }

  @Post()
  async create(@Body() createVacationDto: CreateVacationDto) {
    return this.vacationService.create(createVacationDto);
  }
}
