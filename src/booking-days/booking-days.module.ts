import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingDay } from "./entities/booking-day.entity";
import { BookingDaysService } from "./booking-days.service";
import { BookingDaysController } from "./booking-days.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BookingDay])],
  providers: [BookingDaysService],
  controllers: [BookingDaysController],
})
export class BookingDaysModule {}
