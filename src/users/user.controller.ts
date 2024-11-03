import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AuthGuard } from "../auth/auth-guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":companyId")
  async findUsersByCompanyId(
    @Param("companyId") companyId: string
  ): Promise<User[]> {
    return this.userService.findUsersByCompanyId(companyId);
  }

  @Get(":id")
  async findUser(@Param("id") id: string) {
    return this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() user: any): Promise<User> {
    console.log(`UPDATE USER`, user);
    return this.userService.update(user);
  }

  @UseGuards(AuthGuard)
  @Put("deactivate")
  async deactivate(@Body() user: User): Promise<User> {
    return this.userService.deactivate(user);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
