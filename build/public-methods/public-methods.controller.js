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
exports.PublicMethodsController = void 0;
var common_1 = require("@nestjs/common");
var public_methods_service_1 = require("./public-methods.service");
var user_status_enum_1 = require("../core/enums/user-status.enum");
var user_utils_1 = require("../users/user.utils");
var booking_days_service_1 = require("../booking-days/booking-days.service");
var vacation_service_1 = require("../vacation/vacation.service");
var user_service_1 = require("../users/user.service");
var update_vacation_solution_dto_1 = require("../vacation-solution/dto/update-vacation-solution.dto");
var vacation_solution_service_1 = require("../vacation-solution/entities/vacation-solution.service");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: "filip_simonovik@hotmail.com",
        pass: "zvezdajezivot",
    },
});
var PublicMethodsController = /** @class */ (function () {
    function PublicMethodsController(publicMethodService, userService, bookingService, vacationService, vacationSolutionService) {
        this.publicMethodService = publicMethodService;
        this.userService = userService;
        this.bookingService = bookingService;
        this.vacationService = vacationService;
        this.vacationSolutionService = vacationSolutionService;
    }
    PublicMethodsController.prototype.webLoginStep1 = function (email, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.publicMethodService.login(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).end("User not found")];
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PublicMethodsController.prototype.postWebLoginStep1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicMethodService.login(req.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send("User is not exist")];
                        }
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, user_utils_1.generateToken)(user.id, req.email)];
                    case 2:
                        token = _a.sent();
                        if (user.status === user_status_enum_1.UserStatus.Active) {
                            if (user.password === req.password) {
                                return [2 /*return*/, res.status(200).send({ user: user, token: token })];
                            }
                            else {
                                return [2 /*return*/, res.status(401).send("Unauthorized")];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(401).send("User is not activated")];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PublicMethodsController.prototype.createBookingRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sendEmail, sendBookingRequestEmail;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("req.body: ", req.user);
                console.log("req.body: ", req);
                sendEmail = function () { return __awaiter(_this, void 0, void 0, function () {
                    var info, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Sending email...");
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, transporter.sendMail({
                                        from: "filip_simonovik@hotmail.com",
                                        to: "filip@mozok.de",
                                        subject: "Test Email",
                                        html: "\n            <div style='text-align: center' >\n            <h1>Vacation Booking Request</h1>\n            <div style='text-align: center'>\n              <div style='padding: 20px'>\n                <div style='border: 2px solid grey'>\n                  <h3 style='padding: 10px'>".concat(req.firstName, " ").concat(req.lastName, "</h3>\n                </div>\n              </div>\n              <p>\n              With this request, I submit a request to use annual leave from ").concat(req.start, " to ").concat(req.end, "</p>\n              <p>Total days: ").concat(req.bookedDays, "</p>\n              <p>Description:</p>\n              <div style='border: 2px solid grey'>\n               <p style='padding: 2px'>").concat(req.title, "</p>\n              </div>\n            </div>\n            <div>\n            <p>Please review and approve or reject this booking request.</p>\n            <p>Click the following links to submit your response:</p>\n            <a href='http://localhost:3000/approve?bookingId=").concat(req.id, "'>Approve</a>\n            <a href=\"http://localhost:3000/reject?bookingId=").concat(req.id, "\">Reject</a>\n            </div>\n            </div>\n          "),
                                        text: "Annual leave request.",
                                    })];
                            case 2:
                                info = _a.sent();
                                console.log("Email sent:", info.messageId);
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                console.error("Error sending email:", error_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                sendBookingRequestEmail = function (bookingDetails) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(bookingDetails);
                                return [4 /*yield*/, sendEmail()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                sendBookingRequestEmail(req);
                return [2 /*return*/];
            });
        });
    };
    PublicMethodsController.prototype.approveVacationRequest = function (bookingId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, user, vacation, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.bookingService.approveBookingRequest(bookingId)];
                    case 1:
                        booking = _a.sent();
                        console.log("BOOKING", booking);
                        console.log("before user");
                        console.log("userId: ", booking.userId);
                        return [4 /*yield*/, this.userService.findUser(booking.userId)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.vacationService.findVacationByDate(user.id, booking.start)];
                    case 3:
                        vacation = _a.sent();
                        console.log("Vacation", vacation[0]);
                        return [4 /*yield*/, this.vacationService.update(vacation[0], {
                                days: vacation[0].days - booking.bookedDays,
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send(booking)];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).send(error_3.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PublicMethodsController.prototype.createVacationSolution = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var vacationSolution, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.vacationSolutionService.create(req)];
                    case 1:
                        vacationSolution = _a.sent();
                        return [2 /*return*/, res.status(200).send(vacationSolution)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(500).send(error_4.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Get)("/login/:email"),
        __param(0, (0, common_1.Param)("email")),
        __param(1, (0, common_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], PublicMethodsController.prototype, "webLoginStep1", null);
    __decorate([
        (0, common_1.Post)("/login"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], PublicMethodsController.prototype, "postWebLoginStep1", null);
    __decorate([
        (0, common_1.Post)("/booking-requests"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], PublicMethodsController.prototype, "createBookingRequest", null);
    __decorate([
        (0, common_1.Get)("/approve"),
        __param(0, (0, common_1.Query)("bookingId")),
        __param(1, (0, common_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], PublicMethodsController.prototype, "approveVacationRequest", null);
    __decorate([
        (0, common_1.Post)("/vacation-solution"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [update_vacation_solution_dto_1.CreateVacationSolutionDto, Object]),
        __metadata("design:returntype", Promise)
    ], PublicMethodsController.prototype, "createVacationSolution", null);
    PublicMethodsController = __decorate([
        (0, common_1.Controller)(),
        __metadata("design:paramtypes", [public_methods_service_1.PublicMethodsService,
            user_service_1.UserService,
            booking_days_service_1.BookingDaysService,
            vacation_service_1.VacationService,
            vacation_solution_service_1.VacationSolutionService])
    ], PublicMethodsController);
    return PublicMethodsController;
}());
exports.PublicMethodsController = PublicMethodsController;
//# sourceMappingURL=public-methods.controller.js.map