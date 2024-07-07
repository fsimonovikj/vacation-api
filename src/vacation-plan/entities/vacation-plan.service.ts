import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { VacationPlan } from "./vacation-plan.entity";
import { CreateVacationPlanDto } from "../dto/update-vacation-plan.dto";

@Injectable()
export class VacationPlanService {
  constructor(
    @InjectRepository(VacationPlan)
    private readonly vacationPlanRepository: Repository<VacationPlan>
  ) {}

  async create(data: CreateVacationPlanDto) {
    const plan = await this.vacationPlanRepository.create({
      ...data,
    });

    const savedVacationPlan = await this.vacationPlanRepository.save(plan);
    return savedVacationPlan;
  }
}
