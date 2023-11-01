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
exports.UserTracker = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../../core/entities/base.entity");
var user_entity_1 = require("../../user/entities/user.entity");
var UserTracker = /** @class */ (function (_super) {
    __extends(UserTracker, _super);
    function UserTracker(partial) {
        var _this = _super.call(this) || this;
        Object.assign(_this, partial);
        return _this;
    }
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 6 }),
        __metadata("design:type", Number)
    ], UserTracker.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 6 }),
        __metadata("design:type", Number)
    ], UserTracker.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
        __metadata("design:type", Number)
    ], UserTracker.prototype, "accuracy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.userTracker; }),
        __metadata("design:type", user_entity_1.User)
    ], UserTracker.prototype, "user", void 0);
    UserTracker = __decorate([
        (0, typeorm_1.Entity)({ name: 'user-tracker' }),
        __metadata("design:paramtypes", [Object])
    ], UserTracker);
    return UserTracker;
}(base_entity_1.BaseEntity));
exports.UserTracker = UserTracker;
//# sourceMappingURL=user-tracker.entity.js.map