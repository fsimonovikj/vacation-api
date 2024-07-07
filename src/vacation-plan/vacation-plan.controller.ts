import { Body, Controller, Get, Post } from "@nestjs/common";
import { VacationPlanService } from "./vacation-plan.service";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { CreateVacationPlanDto } from "./dto/update-vacation-plan.dto";

@Controller("vacation-plan")
export class VacationPlanController {
  constructor(private readonly vacationPlanService: VacationPlanService) {}

  @Get("lists")
  async findAll(): Promise<VacationPlan[]> {
    return this.vacationPlanService.findAll();
  }

  @Post()
  async create(@Body() data: VacationPlan): Promise<VacationPlan> {
    return this.vacationPlanService.create(data);
  }
}
