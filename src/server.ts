import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { userRouter } from './modules/users/user.index';
import { errorMiddleware } from './middleware/error.middleware';
import { authRouter } from './modules/auth/auth.index';
import { balanceRouter } from './modules/balances/balance.index';
import { expenseRouter } from './modules/expenses/expense.index';
import { healthRouter } from './modules/health/health.index';

export class Server {
  private readonly app = express();

  constructor() {
    this.app.enable('case sensitive routing');
    this.app.use(bodyParser.json());
  }

  public init = async (): Promise<void> => {
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      })
    );
    this.app.use(userRouter.router);
    this.app.use(authRouter.router);
    this.app.use(balanceRouter.router);
    this.app.use(expenseRouter.router);
    this.app.use(healthRouter.router);

    this.app.use(errorMiddleware);
  };

  public start = async (): Promise<void> => {
    const port = process.env.PRODUCTION === 'true' ? 80 : 3000;
    this.app.listen(port, () =>
      console.log(`backend started in ${port} port!`)
    );
  };
}
