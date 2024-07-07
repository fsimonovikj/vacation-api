import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { VacationPlanService } from "./vacation-plan.service";
import { VacationPlanController } from "./vacation-plan.controller";

@Module({
  imports: [TypeOrmModule.forFeature([VacationPlan])],
  providers: [VacationPlanService],
  controllers: [VacationPlanController],
})
export class VacationPlanModule {}
