import { StatusCodes } from "http-status-codes";
import mongodbClient from "../db/mongodbClient";
import { handleSuccess } from '../utils/responseHandler';

class AppController {
    static async appStatus(req, res) {
        return res.status(200).json({
            'mongodb': mongodbClient.isAlive(),
        });
    }
}

export default AppController;