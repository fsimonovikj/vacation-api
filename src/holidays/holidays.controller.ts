import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { HolidaysService } from "./holidays.service";
import { AuthGuard } from "../auth/auth-guard";
import { CreateHolidayDto } from "./dto/create-holiday.dto";

@UseGuards(AuthGuard)
@Controller("holidays")
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) {}

  @Get()
  async findAll() {
    return this.holidayService.findAll();
  }

  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidayService.create(createHolidayDto);
  }
}
