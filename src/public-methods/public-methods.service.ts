import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../users/user.service";

@Injectable()
export class PublicMethodsService {
  constructor(private readonly userService: UserService) {}

  async login(email: string) {
    return this.userService.findUserByEmail(email);
  }
}
