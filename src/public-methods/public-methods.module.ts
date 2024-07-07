import { Module, forwardRef } from "@nestjs/common";
import { PublicMethodsController } from "./public-methods.controller";
import { PublicMethodsService } from "./public-methods.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { User } from "../users/entities/user.entity";
import { UserController } from "../users/user.controller";
import { UserService } from "../users/user.service";
import { BookingDay } from "../booking-days/entities/booking-day.entity";
import { BookingDaysController } from "../booking-days/booking-days.controller";
import { BookingDaysService } from "../booking-days/booking-days.service";
import { BookingDaysModule } from "../booking-days/booking-days.module";
import { VacationDay } from "../vacation/entities/vacation.entity";
import { VacationModule } from "../vacation/vacation.module";
import { VacationController } from "../vacation/vacation.controller";
import { VacationService } from "../vacation/vacation.service";
import { VacationPlan } from "../vacation-plan/entities/vacation-plan.entity";
import { VacationPlanService } from "../vacation-plan/entities/vacation-plan.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([BookingDay]),
    forwardRef(() => BookingDaysModule),
    TypeOrmModule.forFeature([VacationDay]),
    forwardRef(() => VacationModule),
    TypeOrmModule.forFeature([VacationPlan]),
  ],
  controllers: [
    PublicMethodsController,
    UserController,
    BookingDaysController,
    VacationController,
  ],
  providers: [
    PublicMethodsService,
    UserService,
    BookingDaysService,
    VacationService,
    VacationPlanService,
  ],
  exports: [PublicMethodsService],
})
export class PublicMethodsModule {}
