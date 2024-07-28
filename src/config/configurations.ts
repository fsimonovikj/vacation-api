interface AdminWebConfig {
  apiBaseUrl: string;
  webBaseUrl: string;
  database?: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

let env: any = process.env.VACATION_ENVIRONMENT ?? "local";

let apiConfig: AdminWebConfig;

switch (env) {
  case "local":
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:4000",
      database: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: null,
        password: null,
      },
    };
    break;
  case "development":
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:3001",
      database: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: null,
        password: null,
      },
    };
    break;
  case "staging":
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:3001",
      database: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: null,
        password: null,
      },
    };
    break;
  case "production":
    apiConfig = {
      apiBaseUrl: "http://api.odmor.k.net.mk:3000",
      webBaseUrl: "http://odmor.k.net.mk:4000",
      database: {
        type: "mysql",
        host: process.env.DATABASE_HOST_PROD,
        port: 3306,
        username: process.env.DATABASE_USER_PROD,
        password: process.env.DATABASE_PASSWORD_PROD,
      },
    };
    break;
  case "knet": {
    apiConfig = {
      apiBaseUrl: "http://api.odmor.k.net.mk:3000",
      webBaseUrl: "http://odmor.k.net.mk:4000",
      database: {
        type: "mysql",
        host: process.env.DATABASE_HOST_KNET,
        port: 3306,
        username: process.env.DATABASE_USER_KNET,
        password: process.env.DATABASE_PASSWORD_KNET,
      },
    };
    break;
  }
  default:
    apiConfig = {
      apiBaseUrl: "http://localhost:3000",
      webBaseUrl: "http://localhost:3001",
    };
}

export default apiConfig;
