"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_schedule_1 = __importDefault(require("node-schedule"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Database_1 = __importDefault(require("./core/Database"));
const Router_1 = __importDefault(require("./core/Router"));
const PlaylistSync_1 = __importDefault(require("./core/PlaylistSync"));
const Scraper_1 = __importDefault(require("./core/Scraper"));
const bootstrap = async () => {
    await Database_1.default();
    await Router_1.default();
    await Scraper_1.default();
    await PlaylistSync_1.default();
};
bootstrap();
// run scraper() every hour
node_schedule_1.default.scheduleJob("0 */1 * * *", async () => {
    await Scraper_1.default();
});
// run playlistSync() every day
node_schedule_1.default.scheduleJob("0 0 * * *", async () => {
    await PlaylistSync_1.default();
});
//# sourceMappingURL=index.js.map