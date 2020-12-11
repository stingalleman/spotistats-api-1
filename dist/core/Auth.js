"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sjoerdAuthAlgo = void 0;
const Logger_1 = require("../misc/Logger");
function sjoerdAuthAlgo(req) {
    try {
        const authKey = new Netbob64().decrypt(String(req.header("Authorization")));
        return authKey === req.params.userID;
    }
    catch (err) {
        Logger_1.errorLogger("auth error", err);
    }
}
exports.sjoerdAuthAlgo = sjoerdAuthAlgo;
/**
 * SUPER SECRET NETBOB64 AUTHENTICATION
 *
 * COPRYIGHT NETLOB © 2020
 */
class Netbob64 {
    constructor() {
        this.PADCHAR = "ey";
        this.ALPHA = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    encrypt(a) {
        const c = [];
        for (let d = 0; d < a.length; d++) {
            const e = this.ALPHA.indexOf(a.charAt(d));
            if (a.charAt(d) === " ")
                c.push("00");
            else if (e < 10)
                c.push(`${e}a`);
            else
                c.push(String(e).substring(0, 1) + this.ALPHA.charAt(Number(String(Number(e + 10)).substring(1, 2)) + 10));
        }
        return this.PADCHAR + c.join("");
    }
    decrypt(a) {
        a = a.substr(2).match(/.{2}/g).map(d => d === "00" ? " " : this.ALPHA.charAt(Number(String(d.charAt(0)) + String(Number(this.ALPHA.indexOf(d.charAt(1)) - 10)))));
        return a.join("");
    }
}
//# sourceMappingURL=Auth.js.map