import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserStatus } from "../core/enums/user-status.enum";
import { VacationType } from "../vacation/types/vacation-type";

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
      relations: ["managedCompanies"],
      order: { createdAt: "ASC" },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
        deletedAt: null,
      },
      relations: ["managedCompanies"],
    });
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ["managedCompanies"],
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      relations: ["managedCompanies"],
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(user: any): Promise<any> {
    if (user.currentPassword && user.newPassword) {
      const regexPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      );
      if (user.currentPassword !== user.password) {
        throw new HttpException(
          "Current password is incorrect",
          HttpStatus.BAD_REQUEST
        );
      }

      if (!regexPassword.test(user.newPassword)) {
        throw new HttpException(
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
          HttpStatus.BAD_REQUEST
        );
      }

      if (user.newPassword && user.currentPassword === user.password) {
        user.password = user.newPassword;
      }
    }

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async deactivate(user: User): Promise<User> {
    const [username, domain] = user.email.split("@");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newEmail = `${username}-${timestamp}@${domain}`;

    // Prepare updated fields
    const updatedFields = {
      deletedAt: new Date(),
      firstName: `${user.firstName}-${timestamp}`,
      lastName: `${user.lastName}-${timestamp}`,
      email: newEmail,
      password: null, // Ensure the password column is nullable
      status: UserStatus.Deactivated,
    };

    // Update the user record in the database
    await this.userRepository.update(user.id, updatedFields);

    // Fetch the updated user
    const updatedUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!updatedUser) {
      throw new Error("Failed to fetch the updated user");
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findUsersByCompanyId(companyId: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.managedCompanies", "managedCompanies")
      .where("users.companyId = :companyId", { companyId })
      .andWhere("users.deletedAt IS NULL OR users.deletedAt = :blank", {
        blank: "0000-00-00 00:00:00",
      })
      .andWhere("users.status IN (:...statuses)", {
        statuses: ["active", "pending"],
      })
      .orderBy("users.createdAt", "ASC")
      .getMany();
  }

  async findUserByCompanyWithLocation(companyId: string, type: VacationType) {
    return await this.userRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.company", "company")
      .where("users.companyId = :companyId", { companyId })
      .andWhere("users.type = :type", { type })
      .andWhere("users.deletedAt IS NULL OR users.deletedAt = :blank", {
        blank: "0000-00-00 00:00:00",
      })
      .andWhere("users.status IN (:...statuses)", {
        statuses: ["active", "pending"],
      })
      .orderBy("users.createdAt", "ASC")
      .getMany();
  }
}
