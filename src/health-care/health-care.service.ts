import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { HealthCare } from "./entities/health-care.entity";

@Injectable()
export class HealthCareService {
  constructor(
    @InjectRepository(HealthCare)
    private readonly healthCareRepository: Repository<HealthCare>
  ) {}

  async create(healthCareData: Partial<HealthCare>): Promise<HealthCare> {
    const healthCare = new HealthCare(healthCareData); // Use constructor to merge partial data
    return this.healthCareRepository.save(healthCare);
  }

  async findAll(): Promise<HealthCare[]> {
    return this.healthCareRepository.find({
      where: {
        deletedAt: null,
      },
      order: { createdAt: "ASC" },
    });
  }
}
