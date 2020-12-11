"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.infoLogger = exports.errorLogger = void 0;
const Logger_1 = require("./Logger");
Object.defineProperty(exports, "errorLogger", { enumerable: true, get: function () { return Logger_1.errorLogger; } });
Object.defineProperty(exports, "infoLogger", { enumerable: true, get: function () { return Logger_1.infoLogger; } });
const Sleep_1 = __importDefault(require("./Sleep"));
exports.sleep = Sleep_1.default;
//# sourceMappingURL=index.js.map