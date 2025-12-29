import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const createExpenseSchema = z.object({
  amount: z.number(),
  description: z.string().min(3),
  expenseDate: z.date(),
});

export type ExpenseCreateResponse = Prisma.ExpenseGetPayload<{
  select: {
    amount: true;
    description: true;
    expenseDate: true;
  };
}>;

export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>;
