import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Holiday } from "./entities/holiday.entity";
import { CreateHolidayDto } from "./dto/create-holiday.dto";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>
  ) {}

  async findAll(): Promise<Holiday[]> {
    return this.holidayRepository
      .createQueryBuilder("holiday")
      .where("holiday.deletedAt IS NULL")
      .getMany();
  }

  async create(holiday: CreateHolidayDto): Promise<Holiday> {
    const newHoliday = this.holidayRepository.create({
      id: uuidV4(),
      ...holiday,
    });
    return this.holidayRepository.save(newHoliday);
  }
}
