"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "Filip5544#",
    database: 'midel',
    entities: [(0, path_1.join)(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: true,
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    // cli: {
    //   migrationsDir: 'src/database/migrations',
    // },
};
exports.default = config;
//# sourceMappingURL=typeorm.config.js.map