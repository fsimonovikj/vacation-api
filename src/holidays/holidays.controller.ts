import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { HolidaysService } from "./holidays.service";

@Controller("holidays")
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) {}

  @Get()
  async findAll() {
    return this.holidayService.findAll();
  }
}
