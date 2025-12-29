import { BalanceCreateResponse, CreateBalanceDTO } from './balance.dto';
import { prisma } from '../../lib/prisma';

export interface BalanceService {
  create(
    data: CreateBalanceDTO,
    userId: string
  ): Promise<BalanceCreateResponse>;
}

export class BalanceServiceImpl implements BalanceService {
  public create = async (
    data: CreateBalanceDTO,
    userId: string
  ): Promise<BalanceCreateResponse> => {
    return prisma.monthlyBalance.create({
      data: {
        ...data,
        createdBy: {
          connect: { userId },
        },
      },
      select: {
        month: true,
        year: true,
        totalAmount: true,
        foodAmount: true,
        mealAmount: true,
      },
    });
  };
}
