import { Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRouter {
  constructor(private authController: AuthController) {}

  get router() {
    const router = Router();

    router.post('/login', this.authController.login);
    router.get('/me/:token', this.authController.me);

    return router;
  }
}
