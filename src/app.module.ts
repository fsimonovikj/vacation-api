import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PublicMethodsModule } from "./public-methods/public-methods.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./users/user.module";
import config from "./config/typeorm.config";
import { BookingDaysModule } from "./booking-days/booking-days.module";
import { HolidayModule } from "./holidays/holidays.module";
import { VacationModule } from "./vacation/vacation.module";
import { VacationPlanModule } from "./vacation-plan/vacation-plan.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRoot(config),
    UserModule,
    BookingDaysModule,
    VacationModule,
    VacationPlanModule,
    PublicMethodsModule,
    HolidayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
