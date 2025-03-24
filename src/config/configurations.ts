interface AdminWebConfig {
  apiBaseUrl: string;
  webBaseUrl: string;
  analyzerBaseUrl: string;
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
      analyzerBaseUrl: "http://localhost:9000",
      database: {
        type: "postgres",
        host: process.env.DATABASE_HOST_LOCAL,
        port: 5432,
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
      analyzerBaseUrl: "http://localhost:9000",
      database: {
        type: "postgres",
        host: process.env.DATABASE_HOST_LOCAL,
        port: 5432,
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
      analyzerBaseUrl: process.env.ANALYZER_BASE_URL_PROD,
      database: {
        type: "postgres",
        host: process.env.DATABASE_HOST_PROD,
        port: 5432,
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
      analyzerBaseUrl: "http://localhost:9000",
    };
}

export default apiConfig;
