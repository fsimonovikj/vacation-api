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

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    BookingDaysModule,
    VacationModule,
    PublicMethodsModule,
    HolidayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
