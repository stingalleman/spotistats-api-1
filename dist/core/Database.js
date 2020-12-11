"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const Logger_1 = require("../misc/Logger");
exports.default = async () => {
    try {
        const db = await typeorm_1.createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            entities: entities_1.TypeormEntities,
        });
        Logger_1.infoLogger("Database connected");
        return db;
    }
    catch (error) {
        Logger_1.errorLogger("Database connection failed!", error);
        process.exit(1);
    }
};
//# sourceMappingURL=Database.js.map