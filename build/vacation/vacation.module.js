"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var vacation_entity_1 = require("./entities/vacation.entity");
var vacation_service_1 = require("./vacation.service");
var vacation_controller_1 = require("./vacation.controller");
var user_entity_1 = require("../users/entities/user.entity");
var user_module_1 = require("../users/user.module");
var user_service_1 = require("../users/user.service");
var VacationModule = /** @class */ (function () {
    function VacationModule() {
    }
    VacationModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([vacation_entity_1.VacationDay]),
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                (0, common_1.forwardRef)(function () { return user_module_1.UserModule; }),
            ],
            providers: [vacation_service_1.VacationService, user_service_1.UserService],
            controllers: [vacation_controller_1.VacationController],
        })
    ], VacationModule);
    return VacationModule;
}());
exports.VacationModule = VacationModule;
//# sourceMappingURL=vacation.module.js.map