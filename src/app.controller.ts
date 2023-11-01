import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserService } from "./users/user.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  health() {
    return {
      result: true,
    };
  }
}
