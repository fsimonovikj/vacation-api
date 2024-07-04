import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: "80.77.157.1",
  port: 3306,
  username: "dare",
  password: `NemaVrska123`,
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
