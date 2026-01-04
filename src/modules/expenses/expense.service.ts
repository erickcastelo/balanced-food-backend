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

    const balance = await prisma.monthlyBalance.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        [field]: true,
        month: true,
        year: true,
      },
    });

    const result = await prisma.expense.groupBy({
      by: ['monthlyBalanceId'],
      where: {
        userId: user?.id,
        monthlyBalanceId: Number(balance?.id),
      },
      _sum: {
        amount: true,
      },
    });

    const response = {
      amount: balance?.[field],
      month: balance?.month,
      year: balance?.year,
      totalExpenses: result.length > 0 ? result[0]?._sum.amount : 0,
    };

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

    return { ...response, expenseHistory };
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
