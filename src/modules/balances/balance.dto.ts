import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const createBalanceSchema = z.object({
  month: z.number(),
  year: z.number(),
  totalAmount: z.number(),
  foodAmount: z.number(),
  mealAmount: z.number(),
});

export type BalanceCreateResponse = Prisma.MonthlyBalanceGetPayload<{
  select: {
    month: true;
    year: true;
    totalAmount: true;
    foodAmount: true;
    mealAmount: true;
  };
}>;

export type CreateBalanceDTO = z.infer<typeof createBalanceSchema>;
