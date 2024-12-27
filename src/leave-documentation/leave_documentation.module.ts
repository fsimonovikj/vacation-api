import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveDocumentation } from "./entities/leave_documentation.entity";
import { LeaveDocumentationService } from "./leave_documentation.service";
import { LeaveDocumentationController } from "./leave_documentation.controller";
import { User } from "../users/entities/user.entity";
import { UserModule } from "../users/user.module";
import { UserService } from "../users/user.service";
import { VacationDay } from "../vacation/entities/vacation.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveDocumentation]),
    TypeOrmModule.forFeature([VacationDay]),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    forwardRef(() => LeaveDocumentationModule),
  ],
  providers: [LeaveDocumentationService, UserService],
  controllers: [LeaveDocumentationController],
  exports: [LeaveDocumentationService],
})
export class LeaveDocumentationModule {}
