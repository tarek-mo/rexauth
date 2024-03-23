import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

// gets triggered when a route is not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (
    err.name === "CastError" &&
    err instanceof Error.CastError &&
    err.kind === "ObjectId"
  ) {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
