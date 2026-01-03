import { Router } from 'express';
import { UserController } from './user.controller';
import { ensureAuthenticated } from '../../middleware/auth.middleware';

export class UserRouter {
  constructor(private userController: UserController) {}
  get router() {
    const router = Router();
    router.get('/user', ensureAuthenticated, this.userController.list);
    router.post('/user', this.userController.create);

    return router;
  }
}
