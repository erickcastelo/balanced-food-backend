import { BalanceControllerImpl } from './balance.controller';
import { UserRouter } from './balance.router';
import { BalanceServiceImpl } from './balance.service';

const balanceService = new BalanceServiceImpl();
const balanceController = new BalanceControllerImpl(balanceService);
const balanceRouter = new UserRouter(balanceController);

export { balanceRouter };
