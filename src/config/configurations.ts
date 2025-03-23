interface AdminWebConfig {
  apiBaseUrl: string;
  webBaseUrl: string;
  database?: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
}

let env: any = process.env.VACATION_ENVIRONMENT ?? "development";

let apiConfig: AdminWebConfig;

switch (env) {
  case "local":
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:4000",
      database: {
        type: "mysql",
        host: process.env.DATABASE_HOST_LOCAL,
        port: 3306,
        username: process.env.DATABASE_USER_LOCAL,
        password: process.env.DATABASE_PASSWORD_LOCAL,
        name: process.env.DATABASE_NAME_LOCAL,
      },
    };
    break;
  case "development":
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:4000",
      database: {
        type: "mysql",
        host: process.env.DATABASE_HOST_LOCAL,
        port: 3306,
        username: process.env.DATABASE_USER_LOCAL,
        password: process.env.DATABASE_PASSWORD_LOCAL,
        name: process.env.DATABASE_NAME_LOCAL,
      },
    };
    break;
  case "production":
    apiConfig = {
      apiBaseUrl: process.env.API_BASE_URL_PROD,
      webBaseUrl: process.env.WEB_BASE_URL_PROD,
      database: {
        type: "mysql",
        host: process.env.DATABASE_HOST_PROD,
        port: 3306,
        username: process.env.DATABASE_USER_PROD,
        password: process.env.DATABASE_PASSWORD_PROD,
        name: process.env.DATABASE_NAME_PROD,
      },
    };
    break;
  default:
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:4000",
    };
}

export default apiConfig;
