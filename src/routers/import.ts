import express, { Router } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";

const importRouter = Router();

importRouter.use(fileUpload());

importRouter.use("/import", express.static("static"));

importRouter.post("/upload", (req, res) => {
  const files = [];
  Object.keys(req.files).forEach((file) => files.push(req.files[file]));
  files.forEach((file) => {
    if (!fs.existsSync(`data/users/${"sjoerdgaatwakawaka"}`)) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fs.mkdir(`data/users/${"sjoerdgaatwakawaka"}`, () => {});
    }
    fs.writeFileSync(
      `data/users/${"sjoerdgaatwakawaka"}/${file.name}`,
      file.data
    );
  });
  res.status(200).end();
});

export default importRouter;
