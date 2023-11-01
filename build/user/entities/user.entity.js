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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var user_status_enum_1 = require("../../core/enums/user-status.enum");
var user_role_enum_1 = require("../../core/enums/user-role.enum");
var booking_day_entity_1 = require("../../booking-days/entities/booking-day.entity");
var base_entity_1 = require("../../core/entities/base.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(partial) {
        var _this = _super.call(this) || this;
        Object.assign(_this, partial);
        return _this;
    }
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "middleName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false, unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "department", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: user_role_enum_1.UserRole,
            default: user_role_enum_1.UserRole.User,
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: user_status_enum_1.UserStatus,
            default: user_status_enum_1.UserStatus.Pending,
        }),
        __metadata("design:type", String)
    ], User.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return booking_day_entity_1.BookingDay; }, function (booking) { return booking.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "bookings", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)({ name: "users" }),
        __metadata("design:paramtypes", [Object])
    ], User);
    return User;
}(base_entity_1.BaseEntity));
exports.User = User;
//# sourceMappingURL=user.entity.js.map