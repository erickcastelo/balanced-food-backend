import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';

export class HealthRouter {
  private defaultRouter = '/health';
  constructor() {}

  get router() {
    const router = Router();

    router.get(this.defaultRouter, this.health);
    return router;
  }

  private health = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    return response.status(200).send({ status: 'ok' });
  };
}
