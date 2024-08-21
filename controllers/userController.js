import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import Users from '../models/userModel';
import { handleError, handleSuccess } from '../utils/responseHandler';
import User from '../models/userModel';


// {
//     "status":"success",
//     "statusCode":201,
//     "message":"Created",
//     "data":
//         {
//             "username":"test",
//             "_id":"66c4792aa4c2aead3c38c948",
//             "createdAt":"2024-08-20T11:08:26.513Z"
//             ,"updatedAt":"2024-08-20T11:08:26.513Z",
//             "__v":0
//         }
// }

class UsersController {
    // curl -X POST localhost:4000/api/user/create -H "Content-Type:application/json" -d "{\"username\": \"test\"}"
    static async createUser(req, res) {
        try {
            console.log(req.body)
            const {
                username
            } = req.body;

            // If username is missing, return bad request error (400);
            if (!username) {
                return handleError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: 'username is required',
                }, res);
            }
    
            let user = await User.findOne({ username });
    
            // if the username already exist, return forbidden error (403)
            if (user) {
                return handleError({
                    statusCode: StatusCodes.FORBIDDEN,
                    message: `the username is already exist`,
                }, res);
            }
    
            user = await User.create({
                username,
            });
    
            await user.save();
    
            return handleSuccess({
                statusCode: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: user,
            }, res);
        } catch (error) {
            console.log(error.message);
            return handleError({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getUser(req, res) {
        try {
            console.log(req.params)
            const {
                userInfo
            } = req.params;
            let user;

            // Check if the userInfo was ID, if true, get user by Id
            // else get user by username
            if (Types.ObjectId.isValid(userInfo)) {
                user = await User.findById(userInfo);
            } else {
                user = await User.findOne({ username: userInfo });
            }

            console.log(user);

            // If user not exist, return not found error (404)
            if (!user) {
                return handleError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            
            return handleSuccess({
                statusCode: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: user,
            }, res);
        } catch(error) {
            return handleError({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateUser(req, res) {
        try {
            // Get data from url query parameter
            const {
                userInfo
            } = req.params;

            // Get data from req body
            const {
                username
            } = req.body;

            let user;

            // Check if the userInfo was ID, if true, get user by Id
            // else get user by username
            if (Types.ObjectId.isValid(userInfo)) {
                user = await User.findById(userInfo);
            } else {
                user = await User.findOne({ username: userInfo });
            }

            // If user not exist, return not found error (404);
            if (!user) {
                return handleError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Update user data.
            user.username = username;

            // Save changes
            await user.save();

            return handleSuccess({
                statusCode: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: user,
            }, res);

        } catch(error) {
            console.log(error.message);
            return handleError({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async deleteUser(req, res) {
        try {
            const {
                userInfo
            } = req.params;
            let user;

            // Check if the userInfo was ID, if true, get user by Id
            // else get user by username
            if (Types.ObjectId.isValid(userInfo)) {
                user = await User.findById(userInfo);
            } else {
                user = await User.findOne({ username: userInfo });
            }

            if (!user) {
                return handleError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            const deletedUser = await User.findByIdAndDelete(user._id);

            return handleSuccess({
                statusCode: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: deletedUser,
            }, res);
        } catch(error) {
            return handleError({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }
}

export default UsersController;