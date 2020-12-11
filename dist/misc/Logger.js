"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.infoLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
/**
 * Info logger.
 * @param message Message to log to the console.
 */
function infoLogger(message) {
    return console.log(`${chalk_1.default.green("[INFO]")} ${message}`);
}
exports.infoLogger = infoLogger;
/**
 * Error logger.
 * @param message Message to log to the console.
 * @param error Error object.
 */
function errorLogger(message, error) {
    if (error)
        return console.log(`\n${chalk_1.default.red.bold("[ERROR]")} ${chalk_1.default.red(`${message}`)}\n${error}\n`);
    return console.log(`${chalk_1.default.red.bold("[ERROR]")} ${chalk_1.default.red(`${message}`)}`);
}
exports.errorLogger = errorLogger;
//# sourceMappingURL=Logger.js.map