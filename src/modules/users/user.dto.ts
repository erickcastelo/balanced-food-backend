import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const createUserSchema = z.object({
  name: z.string().min(3),
  userId: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user_meal_voucher', 'user_food_voucher']).optional(),
});

export type UserCreateResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    userId: true;
    role: true;
    createdAt: true;
  };
}>;

export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    userId: true;
    role: true;
  };
}>;

export type CreateUserDTO = z.infer<typeof createUserSchema>;
