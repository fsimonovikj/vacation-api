"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicMethodsModule = void 0;
var common_1 = require("@nestjs/common");
var public_methods_controller_1 = require("./public-methods.controller");
var public_methods_service_1 = require("./public-methods.service");
var typeorm_1 = require("@nestjs/typeorm");
var user_module_1 = require("../users/user.module");
var user_entity_1 = require("../users/entities/user.entity");
var user_controller_1 = require("../users/user.controller");
var user_service_1 = require("../users/user.service");
var booking_day_entity_1 = require("../booking-days/entities/booking-day.entity");
var booking_days_controller_1 = require("../booking-days/booking-days.controller");
var booking_days_service_1 = require("../booking-days/booking-days.service");
var booking_days_module_1 = require("../booking-days/booking-days.module");
var vacation_entity_1 = require("../vacation/entities/vacation.entity");
var vacation_module_1 = require("../vacation/vacation.module");
var vacation_controller_1 = require("../vacation/vacation.controller");
var vacation_service_1 = require("../vacation/vacation.service");
var vacation_solution_service_1 = require("../vacation-solution/entities/vacation-solution.service");
var vacation_solution_entity_1 = require("../vacation-solution/entities/vacation-solution.entity");
var PublicMethodsModule = /** @class */ (function () {
    function PublicMethodsModule() {
    }
    PublicMethodsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                (0, common_1.forwardRef)(function () { return user_module_1.UserModule; }),
                typeorm_1.TypeOrmModule.forFeature([booking_day_entity_1.BookingDay]),
                (0, common_1.forwardRef)(function () { return booking_days_module_1.BookingDaysModule; }),
                typeorm_1.TypeOrmModule.forFeature([vacation_entity_1.VacationDay]),
                (0, common_1.forwardRef)(function () { return vacation_module_1.VacationModule; }),
                typeorm_1.TypeOrmModule.forFeature([vacation_solution_entity_1.VacationSolution]),
            ],
            controllers: [
                public_methods_controller_1.PublicMethodsController,
                user_controller_1.UserController,
                booking_days_controller_1.BookingDaysController,
                vacation_controller_1.VacationController,
            ],
            providers: [
                public_methods_service_1.PublicMethodsService,
                user_service_1.UserService,
                booking_days_service_1.BookingDaysService,
                vacation_service_1.VacationService,
                vacation_solution_service_1.VacationSolutionService,
            ],
            exports: [public_methods_service_1.PublicMethodsService],
        })
    ], PublicMethodsModule);
    return PublicMethodsModule;
}());
exports.PublicMethodsModule = PublicMethodsModule;
//# sourceMappingURL=public-methods.module.js.map