import { NextFunction, Request, Response } from 'express';
import { ExpenseService } from './expense.service';

export interface ExpenseController {
  getExpense(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
  create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export class ExpenseControllerImpl implements ExpenseController {
  constructor(private expenseService: ExpenseService) {}
  public getExpense = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const userId = request.user?.userId;
    const expense = await this.expenseService.getExpense(userId ?? '');

    return response.status(200).send(expense);
  };

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const body = request.body;
    const userId = request.user?.userId;

    const data = await this.expenseService.create(body, userId ?? '');
    return response.status(200).send(data);
  };
}
