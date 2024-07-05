interface AdminWebConfig {
  apiBaseUrl: string;
  webBaseUrl: string;
}

let env: any = process.env.VACATION_ENV ?? "local";

let apiConfig: AdminWebConfig;

switch (env) {
  case "local":
    apiConfig = {
      apiBaseUrl: "http://10.1.1.43:3000",
      webBaseUrl: "http://10.1.1.43:4000",
    };
    break;
  case "development":
    apiConfig = {
      apiBaseUrl: "https//localhost:3000",
      webBaseUrl: "http://localhost:3001",
    };
    break;
  case "staging":
    apiConfig = {
      apiBaseUrl: "https//localhost:3000",
      webBaseUrl: "http://localhost:3001",
    };
    break;
  case "production":
    apiConfig = {
      apiBaseUrl: "https//10.1.1.43:3000",
      webBaseUrl: "http://10.1.1.43:4000",
    };
    break;
  default:
    apiConfig = {
      apiBaseUrl: "https//localhost:3000",
      webBaseUrl: "http://localhost:3001",
    };
}

export default apiConfig;
