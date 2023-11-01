"use strict";
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
exports.CreateVacationDto = void 0;
var class_validator_1 = require("class-validator");
var CreateVacationDto = /** @class */ (function () {
    function CreateVacationDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], CreateVacationDto.prototype, "currentVacationDays", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], CreateVacationDto.prototype, "remainingVacationDays", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "start", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "end", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], CreateVacationDto.prototype, "bookedDays", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "status", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateVacationDto.prototype, "userId", void 0);
    return CreateVacationDto;
}());
exports.CreateVacationDto = CreateVacationDto;
//# sourceMappingURL=create-vacations.dto.js.map