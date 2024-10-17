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

  @Get("details/:companyId")
  async findVacationPlanWithUserDetails(
    @Param("companyId") companyId: string
  ): Promise<any[]> {
    return this.vacationPlanService.findVacationPlanWithUserDetails(companyId);
  }

  @Get("available-users/:vacationId/:companyId")
  async findAvailableUsersForVacation(
    @Param("vacationId") vacationId: string,
    @Param("companyId") companyId: string
  ): Promise<User[]> {
    return this.vacationPlanService.findAvailableUsersForVacation(
      vacationId,
      companyId
    );
  }

  @Post(":companyId")
  async create(
    @Body() data: VacationPlan,
    @Param("companyId") companyId: string
  ): Promise<VacationPlan> {
    return this.vacationPlanService.create(data, companyId);
  }

  @Post("add-users/:vacationId/:companyId")
  async addUsersToVacation(
    @Param("vacationId") vacationId: string,
    @Param("companyId") companyId: string,
    @Body() userIds: string[]
  ): Promise<VacationPlan> {
    return this.vacationPlanService.addUsersToVacation(
      vacationId,
      userIds,
      companyId
    );
  }
}
