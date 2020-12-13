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
exports.UserSettings = void 0;
const typeorm_1 = require("typeorm");
let UserSettings = class UserSettings extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: "refreshToken" }),
    __metadata("design:type", String)
], UserSettings.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column({ name: "accessToken" }),
    __metadata("design:type", String)
], UserSettings.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column({ name: "accessTokenExpiration" }),
    __metadata("design:type", Date)
], UserSettings.prototype, "accessTokenExpiration", void 0);
__decorate([
    typeorm_1.Column({ name: "playlistId", nullable: true }),
    __metadata("design:type", Date)
], UserSettings.prototype, "playlistId", void 0);
UserSettings = __decorate([
    typeorm_1.Entity("usersettings")
], UserSettings);
exports.UserSettings = UserSettings;
//# sourceMappingURL=UserSettings.js.map