import { NextFunction, Request, Response } from 'express';
import { BalanceService } from './balance.service';

export interface BalanceController {
  create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export class BalanceControllerImpl implements BalanceController {
  constructor(private balanceService: BalanceService) {}
  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const body = request.body;
    const userId = request.user?.userId;

    const data = await this.balanceService.create(body, userId ?? '');

    return response.status(200).send(data);
  };
}
