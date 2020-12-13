// import "reflect-metadata";
// import * as dotenv from "dotenv";
// dotenv.config();

// import { getManager } from "typeorm";
// import database from "../core/Database";
// import { errorLogger, infoLogger } from "./Logger";

// async function asyncFunc() {
//   await database();

//   const db = getManager();
//   if (process.argv[2] === "DROP") {
//     errorLogger("DROPPING TABLES...");
//     await db.query("DROP TABLE songs CASCADE; DROP TABLE streams CASCADE; DROP TABLE users CASCADE;").then((value) => infoLogger(value));
//     infoLogger("Dropped tables");
//     process.exit();
//   } else if (process.argv[2] === "DELETE") {
//     errorLogger("DELETING...");
//     await db.query("DELETE FROM streams; DELETE FROM songs;");
//     process.exit();
//   }
// }

// asyncFunc();
