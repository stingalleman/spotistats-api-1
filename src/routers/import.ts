import express, { Router } from "express";
import parser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import CloudStorageService from "../services/cloudStorage";
// import bodyParser from "body-parser";

const importRouter = Router();
const cloudStorage = new CloudStorageService();

importRouter.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    abortOnLimit: true,
  })
);

importRouter.use(express.urlencoded({ extended: true }));

// importRouter.use(bodyParser);

importRouter.use("/import", express.static("static"));

importRouter.post("/upload", (req, res) => {
  return new Promise<void>(async (resolve, reject) => {
    if (req.files == undefined || Object.keys(req.files).length == 0) {
      res.send("missing file(s)").status(400).end();
      resolve();
    }

    const uid = req.body.uid;
    if (uid == undefined) {
      res.send("missing uid").status(400).end();
      resolve();
    }

    const files = [];
    Object.keys(req.files).forEach((file) => files.push(req.files[file]));
    files[0].forEach((file): void => {
      const validName = /StreamingHistory[0-9][0-9]?.json/g.test(file.name);
      if (!validName) {
        res.send("invalid file(s)").status(400).end();
        resolve();
      }

      let content = fs.readFileSync(file.tempFilePath, { encoding: "utf8" });

      try {
        content = JSON.parse(content);
        if (content.length > 0 && content.length < 10001) {
          ((content as unknown) as object[]).forEach((e) => {
            if (
              Object.keys(e).length == 4 &&
              "endTime" in e &&
              "artistName" in e &&
              "trackName" in e &&
              "msPlayed" in e
            ) {
            } else throw Error("invalid item(s)");
          });
        } else throw Error("invalid file(s)");
      } catch (e) {
        res.send(e).status(400).end();
        resolve();
      }
    });

    const uploads = [];
    for (let i in files[0]) {
      const file = files[0][i];

      uploads.push(
        await cloudStorage.uploadFile(uid, file.name, file.tempFilePath)
      );
    }

    console.log(uploads);

    res
      .location(`http://127.0.0.1:3000/import/success.html?uid=${uid}`)
      .status(200)
      .end();
    // res.status(200).end();
  });
});

export default importRouter;
