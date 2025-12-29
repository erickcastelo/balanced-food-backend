import { ExpenseControllerImpl } from './expense.controller';
import { ExpenseRouter } from './expense.router';
import { ExpenseServiceImpl } from './expense.service';

const expenseService = new ExpenseServiceImpl();
const expenseController = new ExpenseControllerImpl(expenseService);
const expenseRouter = new ExpenseRouter(expenseController);

export { expenseRouter };
