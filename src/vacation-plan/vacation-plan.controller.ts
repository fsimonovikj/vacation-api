import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { VacationPlanService } from "./vacation-plan.service";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { CreateVacationPlanDto } from "./dto/update-vacation-plan.dto";
import { AuthGuard } from "../auth/auth-guard";

// @UseGuards(AuthGuard)
@Controller("vacation-plan")
export class VacationPlanController {
  constructor(private readonly vacationPlanService: VacationPlanService) {}

  @Get("lists")
  async findAll(): Promise<VacationPlan[]> {
    return this.vacationPlanService.findAll();
  }

  @Get("details")
  async findVacationPlanWithUserDetails(): Promise<any[]> {
    return this.vacationPlanService.findVacationPlanWithUserDetails();
  }

  @Post()
  async create(@Body() data: VacationPlan): Promise<VacationPlan> {
    return this.vacationPlanService.create(data);
  }
}
