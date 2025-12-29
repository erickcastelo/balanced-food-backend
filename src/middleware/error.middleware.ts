import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return response.status(400).json({
    message: err.message || 'Unexpected error',
  });
};
