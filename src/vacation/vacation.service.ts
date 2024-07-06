import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { VacationDay } from "./entities/vacation.entity";
import { CreateVacationDto } from "./dto/create-vacation.dto";
import { UpdateVacationDto } from "./dto/update-vacation.dto";

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(VacationDay)
    private readonly vacationRepository: Repository<VacationDay>
  ) {}

  async findAll(): Promise<VacationDay[]> {
    return this.vacationRepository.find({
      where: {
        deletedAt: null,
      },
      order: { createdAt: "ASC" },
    });
  }

  async findOne(userId: string): Promise<VacationDay> {
    return this.vacationRepository.findOne({
      where: { userId: userId, deletedAt: null },
      order: { createdAt: "ASC" },
    });
  }

  async findByUserId(id: string): Promise<VacationDay[]> {
    return this.vacationRepository.find({
      where: { userId: id, deletedAt: null },
      order: { createdAt: "ASC" },
    });
  }

  async create(createVacationDto: CreateVacationDto) {
    const vacation = await this.vacationRepository.create({
      id: createVacationDto.id,
      title: createVacationDto.title,
      days: createVacationDto.days,
      startAt: createVacationDto.startAt,
      endAt: createVacationDto.endAt,
      userId: createVacationDto.userId,
    });

    const savedVacation = await this.vacationRepository.save(vacation);
    return savedVacation;
  }

  async update(vacation: VacationDay, updateVacationDto: UpdateVacationDto) {
    if (!vacation) {
      throw new Error("Item with this ID not found");
    }

    const updatedVacation = await this.vacationRepository.save({
      ...vacation,
      ...updateVacationDto,
    });

    return updatedVacation;
  }

  async findVacationByDate(userId: string, date: Date) {
    const vacation = await this.vacationRepository.find({
      where: {
        userId,
        deletedAt: null,
      },
    });

    const filteredVacation = vacation.filter((vacation) => {
      if (vacation.startAt <= date && vacation.endAt >= date) {
        return vacation;
      }
    });

    return filteredVacation;
  }
}
