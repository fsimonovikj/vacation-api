import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
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
  @Put(":id")
  async update(@Param("id") id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
