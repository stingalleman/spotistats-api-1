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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const UserSettings_1 = require("./UserSettings");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("text", { nullable: false }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    typeorm_1.Column("bigint", { nullable: false, default: 0 }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], User.prototype, "totalSeconds", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "disabled", void 0);
__decorate([
    typeorm_1.OneToOne(() => UserSettings_1.UserSettings, (userSettings) => userSettings.refreshToken, {
        cascade: true,
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: "settings" }),
    __metadata("design:type", UserSettings_1.UserSettings)
], User.prototype, "settings", void 0);
User = __decorate([
    typeorm_1.Entity("users")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map