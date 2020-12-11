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
exports.Song = void 0;
const typeorm_1 = require("typeorm");
const Stream_1 = require("./Stream");
let Song = class Song extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("text", { nullable: false }),
    __metadata("design:type", String)
], Song.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], Song.prototype, "length", void 0);
__decorate([
    typeorm_1.OneToMany(() => Stream_1.Stream, stream => stream.song, { nullable: true }),
    __metadata("design:type", Array)
], Song.prototype, "streams", void 0);
Song = __decorate([
    typeorm_1.Entity("songs")
], Song);
exports.Song = Song;
//# sourceMappingURL=Song.js.map