"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        const { userId } = decodedToken;
        if (req.params.userId && req.params.userId !== userId) {
            throw Error();
        }
        else {
            next();
        }
    }
    catch (e) {
        res.status(401).end();
    }
};
//# sourceMappingURL=Auth.js.map