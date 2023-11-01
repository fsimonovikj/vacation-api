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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDaysService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var booking_day_entity_1 = require("./entities/booking-day.entity");
var typeorm_2 = require("typeorm");
var booking_status_enum_1 = require("./entities/booking-status.enum");
var BookingDaysService = /** @class */ (function () {
    function BookingDaysService(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    BookingDaysService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingRepository.find({
                        where: {
                            status: (0, typeorm_2.Not)(booking_status_enum_1.BookingStatus.Pending),
                        },
                        order: { createdAt: "DESC" },
                    })];
            });
        });
    };
    BookingDaysService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingRepository.findOne({
                        where: {
                            id: id,
                        },
                    })];
            });
        });
    };
    BookingDaysService.prototype.create = function (createBookingDto) {
        return __awaiter(this, void 0, void 0, function () {
            var vacation, savedVacation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingRepository.create({
                            id: createBookingDto.id,
                            title: createBookingDto.title,
                            description: createBookingDto.description,
                            start: createBookingDto.start,
                            end: createBookingDto.end,
                            bookedDays: createBookingDto.bookedDays,
                            status: createBookingDto.status,
                            userId: createBookingDto.userId,
                        })];
                    case 1:
                        vacation = _a.sent();
                        return [4 /*yield*/, this.bookingRepository.save(vacation)];
                    case 2:
                        savedVacation = _a.sent();
                        return [2 /*return*/, savedVacation];
                }
            });
        });
    };
    BookingDaysService.prototype.approveBookingRequest = function (bookingId) {
        return __awaiter(this, void 0, void 0, function () {
            var booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(bookingId);
                        return [4 /*yield*/, this.bookingRepository.findOneOrFail({
                                where: { id: bookingId },
                            })];
                    case 1:
                        booking = _a.sent();
                        console.log("Booking", booking);
                        if (!booking) {
                            throw new Error("Item with this ID not found");
                        }
                        if (!(booking.status === booking_status_enum_1.BookingStatus.Approved ||
                            booking.status === booking_status_enum_1.BookingStatus.Rejected)) return [3 /*break*/, 2];
                        throw new Error("Booking request already approved or rejected, check status in database.");
                    case 2:
                        booking.status = booking_status_enum_1.BookingStatus.Approved;
                        return [4 /*yield*/, this.bookingRepository.save(booking)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, booking];
                }
            });
        });
    };
    BookingDaysService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(booking_day_entity_1.BookingDay)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], BookingDaysService);
    return BookingDaysService;
}());
exports.BookingDaysService = BookingDaysService;
//# sourceMappingURL=booking-days.service.js.map