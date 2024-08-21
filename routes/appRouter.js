import { Router } from 'express';
import AppController from '../controllers/appController';


const appRouter = Router();

appRouter.get('/status', (req, res) => {
    AppController.appStatus(req, res);
});

export default appRouter;