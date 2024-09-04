import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { VacationPlanService } from "./vacation-plan.service";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { AuthGuard } from "../auth/auth-guard";
import { User } from "../users/entities/user.entity";

@UseGuards(AuthGuard)
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

  @Get("available-users/:vacationId")
  async findAvailableUsersForVacation(
    @Param("vacationId") vacationId: string
  ): Promise<User[]> {
    return this.vacationPlanService.findAvailableUsersForVacation(vacationId);
  }

  @Post()
  async create(@Body() data: VacationPlan): Promise<VacationPlan> {
    return this.vacationPlanService.create(data);
  }

  @Post("add-users/:vacationId")
  async addUsersToVacation(
    @Param("vacationId") vacationId: string,
    @Body() userIds: string[]
  ): Promise<VacationPlan> {
    return this.vacationPlanService.addUsersToVacation(vacationId, userIds);
  }
}
