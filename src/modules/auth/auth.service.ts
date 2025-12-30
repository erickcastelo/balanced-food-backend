import { AuthDTO } from './auth.dto';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserResponse } from '../users/user.dto';
import { TokenPayload } from '../../middleware/auth.middleware';

export interface AuthService {
  login(auth: AuthDTO): Promise<{ token: string }>;
  me(token: string): Promise<UserResponse>;
}

export class AuthServiceImpl implements AuthService {
  public me = async (token: string): Promise<UserResponse> => {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { userId: decoded.sub },
        select: {
          id: true,
          name: true,
          userId: true,
          role: true,
        },
      });

      if (!user) {
        throw Object.assign(new Error('User not found'), { status: 401 });
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  public login = async ({ userId, password }: AuthDTO) => {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(String(password), user.password);

    if (!passwordMatch) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    const token = jwt.sign(
      {
        sub: user.userId,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    );

    return {
      user,
      token,
    };
  };
}
