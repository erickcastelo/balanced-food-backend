import { AuthControllerImpl } from './auth.controller';
import { AuthRouter } from './auth.router';
import { AuthServiceImpl } from './auth.service';

const authService = new AuthServiceImpl();
const authController = new AuthControllerImpl(authService);
const authRouter = new AuthRouter(authController);

export { authRouter };
