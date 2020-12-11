"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = require("../misc/Logger");
const Routes_1 = require("../Routes");
exports.default = async () => {
    const app = express_1.default();
    app.get("/", async (req, res) => res.send("Spotistats API\nhttps://github.com/stingalleman/spotistats-api"));
    app.get("/callback", async (req, res) => await Routes_1.spotifyCallback(req, res));
    app.get("/api/streams", async (req, res) => await Routes_1.getStreams(req, res));
    // app.get("/api/user/:userID", async (req, res) => await getUserInfo(req, res));
    app.get("/api/user/:userID/streams", async (req, res) => await Routes_1.getUserStreams(req, res));
    app.get("/api/user/:userID/dates", async (req, res) => await Routes_1.getUserHistoryInfo(req, res));
    // app.get("/api/song/:songID", async (req, res) => await getUserStreams(req, res));
    app.get("/api/song/:songID/streams/:userID", async (req, res) => await Routes_1.getSongStreams(req, res));
    app.get("/api/user/:userID/artist/:artistID", async (req, res) => await Routes_1.getUserArtist(req, res));
    app.get("/api/user/:userID/song/:songID", async (req, res) => await Routes_1.getUserSong(req, res));
    app.listen("8123", () => Logger_1.infoLogger("Listening on http://localhost:8123"));
};
//# sourceMappingURL=Router.js.map