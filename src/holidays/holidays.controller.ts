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
import { Response } from "express";
import { HolidaysService } from "./holidays.service";
import { AuthGuard } from "../auth/auth-guard";

@UseGuards(AuthGuard)
@Controller("holidays")
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) {}

  @Get()
  async findAll() {
    return this.holidayService.findAll();
  }
}
