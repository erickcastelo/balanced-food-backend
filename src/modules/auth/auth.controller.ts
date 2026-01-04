import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export interface AuthController {
  login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;

  me(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export class AuthControllerImpl implements AuthController {
  constructor(private authService: AuthService) {}
  public me = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { token } = request.params;

      if (!token) {
        return response.status(401).json({ message: 'Token not provided' });
      }

      const user = await this.authService.me(token);

      return response.status(200).send(user);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return response.status(401).json({
          message: 'Token expirado',
        });
      }

      if (error instanceof JsonWebTokenError) {
        return response.status(401).json({
          message: 'Token inválido',
        });
      }

      return response.status(401).json({
        message: 'Não autorizado',
      });
    }
  };

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const body = request.body;
      const data = await this.authService.login(body);
      return response.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}
