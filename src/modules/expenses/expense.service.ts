import { CreateExpenseDTO, ExpenseCreateResponse } from './expense.dto';
import { prisma } from '../../lib/prisma';

export interface ExpenseService {
  create(
    data: CreateExpenseDTO,
    userId: string
  ): Promise<ExpenseCreateResponse>;

  getExpense(userId: string): Promise<ExpenseCreateResponse>;
}

export class ExpenseServiceImpl implements ExpenseService {
  public getExpense = async (userId: string): Promise<any> => {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        role: true,
      },
    });

    const field =
      user?.role === 'user_meal_voucher'
        ? 'mealAmount'
        : user?.role === 'user_food_voucher'
          ? 'foodAmount'
          : 'all';

    const result = await prisma.expense.groupBy({
      by: ['monthlyBalanceId'],
      where: {
        userId: user?.id,
      },
      _sum: {
        amount: true,
      },
    });

    const balance = await prisma.monthlyBalance.findFirst({
      where: {
        id: {
          in: result.map((r) => r.monthlyBalanceId),
        },
      },
      select: {
        id: true,
        [field]: true,
      },
    });

    const response = result.map((r) => ({
      amount: balance?.[field],
      totalExpenses: r._sum.amount,
    }));

    const expenseHistory = await prisma.expense.findMany({
      where: {
        monthlyBalanceId: Number(balance?.id),
      },
      select: {
        amount: true,
        description: true,
        expenseDate: true,
      },
    });

    return response.length > 0 ? { ...response[0], expenseHistory } : [];
  };

  public create = async (
    data: CreateExpenseDTO,
    userId: string
  ): Promise<ExpenseCreateResponse> => {
    const lastBalance = await prisma.monthlyBalance.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    if (!lastBalance) {
      throw new Error('Monthly Balance dont exist');
    }

    return prisma.expense.create({
      data: {
        ...data,
        monthlyBalance: {
          connect: { id: lastBalance?.id },
        },
        user: {
          connect: { userId },
        },
      },
      select: {
        amount: true,
        description: true,
        expenseDate: true,
      },
    });
  };
}
