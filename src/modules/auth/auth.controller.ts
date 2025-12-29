import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

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
    const { token } = request.params;

    if (!token) {
      return response.status(401).json({ message: 'Token not provided' });
    }

    const user = await this.authService.me(token);

    return response.status(200).send(user);
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
