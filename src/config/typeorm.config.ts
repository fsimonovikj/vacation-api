import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: "bms.midel.mk",
  port: 3306,
  username: "bosko",
  password: `boskoz00`,
  database: "leaves",
  entities: [join(__dirname, "/../**/**.entity{.ts,.js}")],
  synchronize: true,
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  logging: true,
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};

export default config;
