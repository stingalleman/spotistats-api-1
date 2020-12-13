import "jsonwebtoken";

import { Request, Response } from "express";

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req: Request, res: Response, next: Function) => {
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
    res.status(401).end();
  }
};
