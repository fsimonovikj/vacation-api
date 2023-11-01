"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configurations = {
    dev: {
        apiBaseUrl: "http://localhost:3000",
        webBaseUrl: "http://localhost:4000",
    },
    staging: {
        apiBaseUrl: "http://localhost:3000",
        webBaseUrl: "http://localhost:4000",
    },
    production: {
        apiBaseUrl: "http://localhost:3000",
        webBaseUrl: "http://localhost:4000",
    },
};
exports.default = (function () {
    var env = process.env.PIXAERA_ENV || "production";
    // console.log('%cconfiguration.ts line:88 env', 'color: #007acc;', env, configurations[env]);
    return configurations[env];
});
//# sourceMappingURL=configurations.js.map