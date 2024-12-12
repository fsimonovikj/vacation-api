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

  async findVacationPlanWithUserDetails(companyId: string): Promise<any[]> {
    const vacationPlans = await this.vacationPlanRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    const detailedPlans = await Promise.all(
      vacationPlans.map(async (plan) => {
        const users = await this.userService.findUsersByCompanyId(companyId);
        const details = await Promise.all(
          users.map(async (user) => {
            const userVacations = await this.vacationService.findByUserId(
              user.id
            );

            if (!userVacations || userVacations.length === 0) {
              return null;
            }

            const planVacation = userVacations.find(
              (v) => v.planId === plan.id
            );

            if (!planVacation) {
              return null;
            }

            return {
              id: user.id,
              vacationId: planVacation.id,
              firstName: user.firstName,
              lastName: user.lastName,
              remainingDays: planVacation.days,
              type: user.type,
            };
          })
        );

        // Filter out any null values from the details array
        const filteredDetails = details.filter((detail) => detail !== null);

        if (filteredDetails.length === 0) {
          return null;
        }

        return {
          ...plan,
          details: filteredDetails,
        };
      })
    );

    // Filter out any null values from the detailedPlans array
    return detailedPlans.filter((plan) => plan !== null);
  }

  async findAvailableUsersForVacation(
    vacationId: string,
    companyId: string
  ): Promise<any[]> {
    const vacationPlan = await this.vacationPlanRepository.findOne({
      where: {
        id: vacationId,
      },
    });

    if (!vacationPlan) {
      throw new Error("Vacation plan not found");
    }

    const activeUsers = await this.userService.findUserByCompanyWithLocation(
      companyId,
      vacationPlan.type
    );

    const existingVacations = await this.vacationService.findByPlanId(
      vacationPlan.id
    );

    const availableUsers = activeUsers.filter((user) => {
      const hasExistingPlan = existingVacations.some(
        (vacation) => vacation.userId === user.id
      );

      return !hasExistingPlan;
    });

    return availableUsers;
  }

  async create(data: CreateVacationPlanDto, companyId: string) {
    const plan = await this.vacationPlanRepository.create(data);

    const hasOverlappingPlan = await this.vacationPlanRepository.findOne({
      where: [
        {
          start: LessThanOrEqual(plan.start),
          end: MoreThanOrEqual(plan.start),
          type: plan.type,
        },
        {
          start: LessThanOrEqual(plan.end),
          end: MoreThanOrEqual(plan.end),
          type: plan.type,
        },
        {
          start: MoreThanOrEqual(plan.start),
          end: LessThanOrEqual(plan.end),
          type: plan.type,
        },
      ],
    });

    if (hasOverlappingPlan) {
      // TODO: return status code 409 instead of throwing an error
      throw new Error("Overlapping vacation plan exists.");
    }

    const savedVacationPlan = await this.vacationPlanRepository.save(plan);

    const activeUsers = await this.userService.findUserByCompanyWithLocation(
      companyId,
      savedVacationPlan.type
    );

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
          type: user.type,
        });
      }
    }

    return savedVacationPlan;
  }

  async addUsersToVacation(
    vacationId: string,
    userIds: string[],
    companyId: string
  ) {
    const vacationPlan = await this.vacationPlanRepository.findOne({
      where: {
        id: vacationId,
      },
    });

    if (!vacationPlan) {
      throw new Error("Vacation plan not found");
    }

    const existingVacations = await this.vacationService.findByPlanId(
      vacationPlan.id
    );

    const activeUsers = await this.userService.findUsersByCompanyId(companyId);

    const usersToAdd = activeUsers.filter((user) => userIds.includes(user.id));

    for (const user of usersToAdd) {
      const hasExistingPlan = existingVacations.some(
        (vacation) => vacation.userId === user.id
      );

      if (hasExistingPlan) {
        continue;
      }

      await this.vacationService.create({
        title: vacationPlan.title,
        days: vacationPlan.days,
        startAt: vacationPlan.start,
        endAt: vacationPlan.end,
        userId: user.id,
        planId: vacationPlan.id,
        type: user.type,
      });
    }

    return vacationPlan;
  }
}
