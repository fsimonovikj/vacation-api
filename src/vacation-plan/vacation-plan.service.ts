import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { VacationPlan } from "./entities/vacation-plan.entity";
import { CreateVacationPlanDto } from "./dto/update-vacation-plan.dto";
import { UserService } from "../users/user.service";
import { VacationService } from "../vacation/vacation.service";

@Injectable()
export class VacationPlanService {
  constructor(
    @InjectRepository(VacationPlan)
    private readonly vacationPlanRepository: Repository<VacationPlan>,
    private readonly userService: UserService,
    private readonly vacationService: VacationService
  ) {}

  async findAll(): Promise<VacationPlan[]> {
    return this.vacationPlanRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findVacationPlanWithUserDetails(): Promise<any[]> {
    const vacationPlans = await this.vacationPlanRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    const detailedPlans = await Promise.all(
      vacationPlans.map(async (plan) => {
        const users = await this.userService.findAll();
        const details = await Promise.all(
          users.map(async (user) => {
            const userVacations = await this.vacationService.findByUserId(
              user.id
            );
            const planVacation = userVacations.find(
              (v) => v.planId === plan.id
            );
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              remainingDays: planVacation ? planVacation.days : 0,
            };
          })
        );
        return {
          ...plan,
          details,
        };
      })
    );

    return detailedPlans;
  }

  async create(data: CreateVacationPlanDto) {
    const plan = await this.vacationPlanRepository.create(data);

    const hasOverlappingPlan = await this.vacationPlanRepository.findOne({
      where: [
        {
          start: LessThanOrEqual(plan.start),
          end: MoreThanOrEqual(plan.start),
        },
        {
          start: LessThanOrEqual(plan.end),
          end: MoreThanOrEqual(plan.end),
        },
        {
          start: MoreThanOrEqual(plan.start),
          end: LessThanOrEqual(plan.end),
        },
      ],
    });

    if (hasOverlappingPlan) {
      // TODO: return status code 409 instead of throwing an error
      throw new Error("Overlapping vacation plan exists.");
    }

    const savedVacationPlan = await this.vacationPlanRepository.save(plan);

    const activeUsers = await this.userService.findAll();

    for (const user of activeUsers) {
      const existingVacations = await this.vacationService.findByUserId(
        user.id
      );

      const hasExistingPlan = existingVacations.some(
        (vacation) => vacation.planId === savedVacationPlan.id
      );

      const hasOverlappingPlan = existingVacations.some((vacation) => {
        if (
          vacation.startAt <= savedVacationPlan.start &&
          vacation.endAt >= savedVacationPlan.start
        ) {
          return true;
        }

        if (
          vacation.startAt <= savedVacationPlan.end &&
          vacation.endAt >= savedVacationPlan.end
        ) {
          return true;
        }

        if (
          vacation.startAt >= savedVacationPlan.start &&
          vacation.endAt <= savedVacationPlan.end
        ) {
          return true;
        }

        return false;
      });

      if (!hasExistingPlan && !hasOverlappingPlan) {
        console.log(`Creating vacation for user`, user.id);
        await this.vacationService.create({
          title: savedVacationPlan.title,
          days: savedVacationPlan.days,
          startAt: savedVacationPlan.start,
          endAt: savedVacationPlan.end,
          userId: user.id,
          planId: savedVacationPlan.id,
        });
      }
    }

    return savedVacationPlan;
  }
}
