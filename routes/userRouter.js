import { Router } from "express";
import UsersController from "../controllers/userController";

const userRouter = Router();

userRouter.post('/user/create', (req, res) => {
    UsersController.createUser(req, res);
});

userRouter.get('/user/:userInfo', (req, res) => {
    UsersController.getUser(req, res);
});

userRouter.put('/user/update/:userInfo', (req, res) => {
    UsersController.updateUser(req, res);
});

userRouter.delete('/user/delete/:userInfo', (req, res) => {
    UsersController.deleteUser(req, res);
});

export default userRouter;