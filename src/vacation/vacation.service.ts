import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { VacationDay } from "./entities/vacation.entity";
import { CreateVacationDto } from "./dto/create-vacation.dto";
import { UpdateVacationDto } from "./dto/update-vacation.dto";
import { v4 as uuidV4 } from "uuid";
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

  async findById(id: string): Promise<VacationDay> {
    return this.vacationRepository.findOne({
      where: { id: id, deletedAt: null },
    });
  }

  async findOne(id: string): Promise<VacationDay> {
    return this.vacationRepository.findOne({
      where: { id, deletedAt: null },
      order: { createdAt: "ASC" },
    });
  }

  async findByUserId(id: string): Promise<VacationDay[]> {
    return await this.vacationRepository.find({
      where: { userId: id, deletedAt: null },
      order: { createdAt: "ASC" },
    });
  }

  async findByPlanId(id: string): Promise<VacationDay[]> {
    return await this.vacationRepository.find({
      where: { planId: id, deletedAt: null },
      order: { createdAt: "ASC" },
    });
  }

  async create(createVacationDto: CreateVacationDto) {
    const vacation = await this.vacationRepository.create({
      id: uuidV4(),
      title: createVacationDto.title,
      days: createVacationDto.days,
      startAt: createVacationDto.startAt,
      endAt: createVacationDto.endAt,
      userId: createVacationDto.userId,
      planId: createVacationDto.planId,
      type: createVacationDto.type,
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

  async updateByManagement(req: any) {
    const vacation = await this.vacationRepository.findOne({
      where: { id: req.vacationId, deletedAt: null },
    });

    if (!vacation) {
      throw new Error("Item with this ID not found");
    }

    const updatedVacation = await this.vacationRepository.save({
      ...vacation,
      days: req.remainingDays,
    });

    return updatedVacation;
  }

  async findVacationByDate(userId: string, date: Date) {
    const vacation = await this.vacationRepository.find({
      where: { userId: userId, deletedAt: null },
      order: { createdAt: "ASC" },
    });

    const filteredVacation = vacation.filter((vacation) => {
      if (vacation.startAt <= date && vacation.endAt >= date) {
        return vacation;
      }
    });

    return filteredVacation;
  }

  async findVacationByIdAndDate(userId: string, date: Date) {
    const vacation = await this.vacationRepository
      .createQueryBuilder("vacation")
      .where("vacation.userId = :userId", { userId })
      .andWhere("vacation.deletedAt IS NULL")
      .orderBy("vacation.createdAt", "ASC")
      .getMany();

    const filteredVacation = vacation.filter((vacation) => {
      if (vacation.startAt <= date && vacation.endAt >= date) {
        return vacation;
      }
    });

    return filteredVacation;
  }
}
