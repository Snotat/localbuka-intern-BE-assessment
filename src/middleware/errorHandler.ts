import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  const status = err.message === "Restaurant not found" ? 404 : 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};