import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacationDay } from "./entities/vacation.entity";
import { VacationService } from "./vacation.service";
import { VacationController } from "./vacation.controller";
import { User } from "../users/entities/user.entity";
import { UserModule } from "../users/user.module";
import { UserService } from "../users/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([VacationDay]),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
  ],
  providers: [VacationService, UserService],
  controllers: [VacationController],
  exports: [VacationService],
})
export class VacationModule {}
