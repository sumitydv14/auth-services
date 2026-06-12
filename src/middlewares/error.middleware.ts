import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  res.status(500).json({
    success: false,
    message: err.message
  });
};