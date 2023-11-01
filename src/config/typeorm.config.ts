import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: `Filip5544#`,
  database: "vacation",
  entities: [join(__dirname, "/../**/**.entity{.ts,.js}")],
  synchronize: true,
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};

export default config;
