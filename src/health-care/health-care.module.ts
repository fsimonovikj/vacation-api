import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthCare } from "./entities/health-care.entity";
import { HealthCareService } from "./health-care.service";
import { HealthCareController } from "./health-care.controller";
import { UserModule } from "../users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthCare]),
    forwardRef(() => UserModule),
  ],

  providers: [HealthCareService],
  controllers: [HealthCareController],
  exports: [HealthCareService],
})
export class HealthCareModule {}
