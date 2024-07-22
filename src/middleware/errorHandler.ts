import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err); // Loguea el error para fines de desarrollo

  res.status(500).json({ error: 'Internal Server Error' });
};
