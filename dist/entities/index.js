"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Stream = exports.Song = exports.TypeormEntities = void 0;
const Song_1 = require("./Song");
Object.defineProperty(exports, "Song", { enumerable: true, get: function () { return Song_1.Song; } });
const Stream_1 = require("./Stream");
Object.defineProperty(exports, "Stream", { enumerable: true, get: function () { return Stream_1.Stream; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
exports.TypeormEntities = [Song_1.Song, Stream_1.Stream, User_1.User];
//# sourceMappingURL=index.js.map