import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { VacationPlanService } from "./vacation-plan.service";
import { VacationPlanController } from "./vacation-plan.controller";
import { UserModule } from "../users/user.module";
import { VacationModule } from "../vacation/vacation.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([VacationPlan]),
    forwardRef(() => UserModule),
    forwardRef(() => VacationModule),
  ],
  providers: [VacationPlanService],
  controllers: [VacationPlanController],
  exports: [VacationPlanService],
})
export class VacationPlanModule {}
