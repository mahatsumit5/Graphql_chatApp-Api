import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/index.js";

export const ErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error coming from the handler", error.message);
  if (error.message.includes(`"password" with value`)) {
    error.message = "Password must match the requirement";
  }
  const code = error.statusCode || 500;
  const msg = error.message || "Internal Server Error.";
  return res.status(code).json({
    status: false,
    message: msg,
  });
};
