import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        deletedAt: null,
      },
      order: { createdAt: "ASC" },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
        deletedAt: null,
      },
    });
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: any, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findUsersByCompanyId(companyId: string): Promise<User[]> {
    return this.userRepository.find({
      where: {
        // TODO: added companyId in the user entity, and filter by companyId
        // companyId: companyId,
        deletedAt: null,
      },
    });
  }
}
