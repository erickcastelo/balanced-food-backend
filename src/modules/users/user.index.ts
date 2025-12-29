import { UserControllerImpl } from './user.controller';
import { UserRouter } from './user.router';
import { UserServiceImpl } from './user.service';

const userService = new UserServiceImpl();
const userController = new UserControllerImpl(userService);
const userRouter = new UserRouter(userController);

export { userRouter };
