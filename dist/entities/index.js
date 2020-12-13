"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettings = exports.User = exports.Stream = exports.TypeormEntities = void 0;
const Stream_1 = require("./Stream");
Object.defineProperty(exports, "Stream", { enumerable: true, get: function () { return Stream_1.Stream; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const UserSettings_1 = require("./UserSettings");
Object.defineProperty(exports, "UserSettings", { enumerable: true, get: function () { return UserSettings_1.UserSettings; } });
exports.TypeormEntities = [Stream_1.Stream, User_1.User, UserSettings_1.UserSettings];
//# sourceMappingURL=index.js.map