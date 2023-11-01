"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationDay = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../../core/entities/base.entity");
var user_entity_1 = require("../../user/entities/user.entity");
var VacationDay = /** @class */ (function (_super) {
    __extends(VacationDay, _super);
    function VacationDay(partial) {
        var _this = _super.call(this) || this;
        Object.assign(_this, partial);
        return _this;
    }
    VacationDay.prototype.getUserId = function () {
        return this.user.id;
    };
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], VacationDay.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], VacationDay.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
        __metadata("design:type", Number)
    ], VacationDay.prototype, "currentVacationDays", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
        __metadata("design:type", Number)
    ], VacationDay.prototype, "remainingVacationDays", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true }),
        __metadata("design:type", Date)
    ], VacationDay.prototype, "start", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true }),
        __metadata("design:type", Date)
    ], VacationDay.prototype, "end", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
        __metadata("design:type", Number)
    ], VacationDay.prototype, "bookedDays", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], VacationDay.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.vacations; }),
        (0, typeorm_1.JoinColumn)({ name: "userId" }),
        __metadata("design:type", user_entity_1.User)
    ], VacationDay.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: false }),
        __metadata("design:type", String)
    ], VacationDay.prototype, "userId", void 0);
    VacationDay = __decorate([
        (0, typeorm_1.Entity)({ name: "vacation-days" }),
        __metadata("design:paramtypes", [Object])
    ], VacationDay);
    return VacationDay;
}(base_entity_1.BaseEntity));
exports.VacationDay = VacationDay;
//# sourceMappingURL=vacation-day.entity.js.map