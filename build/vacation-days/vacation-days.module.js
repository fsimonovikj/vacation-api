"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationDaysModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var vacation_day_entity_1 = require("./entities/vacation-day.entity");
var vacation_days_service_1 = require("./vacation-days.service");
var vacation_days_controller_1 = require("./vacation-days.controller");
var VacationDaysModule = /** @class */ (function () {
    function VacationDaysModule() {
    }
    VacationDaysModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([vacation_day_entity_1.VacationDay])],
            providers: [vacation_days_service_1.VacationDaysService],
            controllers: [vacation_days_controller_1.VacationDaysController],
        })
    ], VacationDaysModule);
    return VacationDaysModule;
}());
exports.VacationDaysModule = VacationDaysModule;
//# sourceMappingURL=vacation-days.module.js.map