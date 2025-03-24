import { Body, Controller, Get, Post } from "@nestjs/common";
import { HealthCareService } from "./health-care.service";
import { v4 as uuidV4 } from "uuid";
import { UserService } from "../users/user.service";
import axios from "axios";
import { HealthCare } from "./entities/health-care.entity";
import apiConfig from "../config/configurations";

@Controller("health-care")
export class HealthCareController {
  constructor(
    private readonly healthCareService: HealthCareService,
    private readonly userService: UserService
  ) {}

  @Get()
  async findAll(): Promise<HealthCare[]> {
    return this.healthCareService.findAll();
  }

  @Post("analyze-mood")
  async analyzeMood(
    @Body() body: { userId: string; conversation: string }
  ): Promise<string> {
    if (!body.userId || !body.conversation) {
      throw new Error("Missing required fields");
    }

    const { userId, conversation } = body;

    try {
      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const response = await axios.post(apiConfig.analyzerBaseUrl, {
        text: conversation,
      });

      const sentiment = response.data;

      const save = {
        id: uuidV4(),
        moodScore: sentiment.vader.compound,
        user: user,
        userId: user.id,
        lastCheckIn: new Date(),
      };

      await this.healthCareService.create(save);

      return `Mood score saved for user ${user.email}, mood score: ${sentiment.vader.compound}`;
    } catch (error) {
      console.log(`ERROR`, error);
      return "Failed to analyze mood";
    }
  }
}
