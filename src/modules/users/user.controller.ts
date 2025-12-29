import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
export interface UserController {
  list(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
  create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export class UserControllerImpl implements UserController {
  constructor(private userService: UserService) {}

  public async list(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    return response.status(200).send('ola');
  }
  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const body = request.body;
      const data = await this.userService.create(body);

      return response.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}
