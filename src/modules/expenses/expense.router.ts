import { Router } from 'express';
import { ensureAuthenticated } from '../../middleware/auth.middleware';
import { ExpenseController } from './expense.controller';

export class ExpenseRouter {
  private defaultRouter = '/expense';

  constructor(private expenseController: ExpenseController) {}

  get router() {
    const router = Router();
    router.get(
      this.defaultRouter,
      ensureAuthenticated,
      this.expenseController.getExpense
    );
    router.post(
      this.defaultRouter,
      ensureAuthenticated,
      this.expenseController.create
    );

    return router;
  }
}
