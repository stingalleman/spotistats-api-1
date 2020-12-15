import jwt from "jsonwebtoken";

import { Request, Response } from "express";

const jwtSecret = process.env.JWT_SECRET;

export default (req: Request, res: Response, next: Function): void => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    const { userId } = decodedToken;
    if (req.params.userId && req.params.userId !== userId) {
      throw Error();
    } else {
      next();
    }
  } catch (e) {
    res.status(401).json({ error: "unauthorized" }).end();
  }
};
