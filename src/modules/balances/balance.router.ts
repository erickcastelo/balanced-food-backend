import { Router } from 'express';
import { ensureAuthenticated } from '../../middleware/auth.middleware';
import { BalanceController } from './balance.controller';

export class UserRouter {
  constructor(private balanceController: BalanceController) {}
  get router() {
    const router = Router();
    router.post('/balance', ensureAuthenticated, this.balanceController.create);

    return router;
  }
}
