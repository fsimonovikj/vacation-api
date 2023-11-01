import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VacationSolution } from "./vacation-solution.entity";
import { Repository } from "typeorm";
import { CreateVacationSolutionDto } from "../dto/update-vacation-solution.dto";

@Injectable()
export class VacationSolutionService {
  constructor(
    @InjectRepository(VacationSolution)
    private readonly vacationSolutionRepository: Repository<VacationSolution>
  ) {}

  async create(data: CreateVacationSolutionDto) {
    const vacationSolution = await this.vacationSolutionRepository.create({
      ...data,
    });

    const savedVacationSolution = await this.vacationSolutionRepository.save(
      vacationSolution
    );
    return savedVacationSolution;
  }
}
