import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRouter } from './modules/users/user.index';
import { errorMiddleware } from './middleware/error.middleware';
import { authRouter } from './modules/auth/auth.index';
import { balanceRouter } from './modules/balances/balance.index';
import { expenseRouter } from './modules/expenses/expense.index';

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

    this.app.use(errorMiddleware);
  };

  public start = async (): Promise<void> => {
    this.app.listen(3000, () => console.log('backend started in 3000 port!'));
  };
}
