import jwt from "jsonwebtoken";
import express, { Router } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import CloudStorageService from "../services/cloudStorage";
import { User } from "../entities/index";

const importRouter = Router();
const jwtSecret = process.env.JWT_SECRET;
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

importRouter.use("/import", express.static("static"));

importRouter.post("/upload", async (req, res) => {
  try {
    if (!(req.files != undefined && Object.keys(req.files).length != 0)) {
      throw Error("missing file(s)");
    }

    const token = req.body.token;
    if (token == undefined) {
      throw Error("missing token");
    }

    const files = [];
    Object.keys(req.files).forEach((file) => files.push(req.files[file]));
    let totalStreams = 0;
    files[0].forEach((file): void => {
      const validName = /StreamingHistory[0-9][0-9]?.json/g.test(file.name);
      if (!validName) {
        throw Error("invalid files");
      }

      let content = fs.readFileSync(file.tempFilePath, { encoding: "utf8" });

      content = JSON.parse(content);
      if (content.length > 0 && content.length < 10001) {
        totalStreams += content.length;
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
    });

    let userId;
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      userId = decodedToken.userId;
    } catch (e) {
      throw Error("invalid auth");
    }

    const user = await User.findOne({
      where: { id: userId },
      relations: ["imports"],
    });

    console.log(user);

    // const uploads = [];
    // for (let i in files[0]) {
    //   const file = files[0][i];

    //   uploads.push(
    //     await cloudStorage.uploadFile(userId, file.name, file.tempFilePath)
    //   );
    // }

    res
      .json({ message: `Succesfully imported ${totalStreams} streams!` })
      .end();
  } catch (e) {
    res.status(400).json({ message: e.message }).end();
  }
});

export default importRouter;
