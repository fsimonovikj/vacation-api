import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Holiday } from "./entities/holiday.entity";
import { HolidaysService } from "./holidays.service";
import { HolidaysController } from "./holidays.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  providers: [HolidaysService],
  controllers: [HolidaysController],
})
export class HolidayModule {}
