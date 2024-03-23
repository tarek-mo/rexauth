import jwt, { Secret } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

      // @ts-ignore
      req.user = await User.findById((decoded as any).userId).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }
);

export { protect };
