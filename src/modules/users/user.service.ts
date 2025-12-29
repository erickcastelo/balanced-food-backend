import { prisma } from '../../lib/prisma';
import { CreateUserDTO, UserCreateResponse } from './user.dto';
import bcrypt from 'bcryptjs';

export interface UserService {
  create(data: CreateUserDTO): Promise<UserCreateResponse>;
}

export class UserServiceImpl implements UserService {
  public create = async (data: CreateUserDTO): Promise<UserCreateResponse> => {
    const userExists = await prisma.user.findUnique({
      where: { userId: data.userId },
    });

    if (userExists) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        userId: data.userId,
        password: hashedPassword,
        role: data.role ?? 'user_meal_voucher',
      },
      select: {
        id: true,
        name: true,
        userId: true,
        role: true,
        createdAt: true,
      },
    });
  };
}
