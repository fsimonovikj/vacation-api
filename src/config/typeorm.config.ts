import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import apiConfig from "./configurations";

import * as dotenv from "dotenv";
import { BookingDay } from "../booking-days/entities/booking-day.entity";
import { Company } from "../companies/entities/company.entity";
import { Holiday } from "../holidays/entities/holiday.entity";
import { LeaveDocumentation } from "../leave-documentation/entities/leave_documentation.entity";
import { User } from "../users/entities/user.entity";
import { VacationDay } from "../vacation/entities/vacation.entity";
import { VacationPlan } from "../vacation-plan/entities/vacation-plan.entity";

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: apiConfig.database.host || process.env.DATABASE_HOST_LOCAL,
  port: apiConfig.database.port || 3306,
  username: apiConfig.database.username || process.env.DATABASE_USER_LOCAL,
  password: apiConfig.database.password || process.env.DATABASE_PASSWORD_LOCAL,
  database: apiConfig.database.name || process.env.DATABASE_NAME_LOCAL,
  // entities: [join(__dirname, "/../**/**.entity{.ts,.js}")],
  entities: [
    BookingDay,
    Company,
    Holiday,
    LeaveDocumentation,
    User,
    VacationDay,
    VacationPlan,
  ],
  synchronize: true,
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  logging: true,
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};

export default config;
