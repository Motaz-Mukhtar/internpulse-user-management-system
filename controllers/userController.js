import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import User from '../models/userModel';
import { handleError, handleSuccess } from '../utils/responseHandler';

// {"status":"success","statusCode":201,"message":"Created","data":{"username":"test","_id":"66c71eea82ce0424b84d1ab7","createdAt":"2024-08-22T11:20:10.791Z","updatedAt":"2024-08-22T11:20:10.792Z","__v":0}}

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
            // Get data from req body
            const {
                userId
            } = req.params;
            
            // Get data from url query parameter
            const username = req.query.username;

            let user;

            // if userId exists get by userId
            // else get user by username
            if (userId) {
                if (Types.ObjectId.isValid(userId))
                    user = await User.findById(userId);
            } else {
                user = await User.findOne({ username });
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
            // Get data from req body
            const {
                userId
            } = req.params;
            
            // Get data from url query parameter
            const username = req.query.username;

            let user;

            // if userId exists get by userId
            // else get user by username
            if (userId) {
                if (Types.ObjectId.isValid(userId))
                    user = await User.findById(userId);
            } else {
                user = await User.findOne({ username });
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
            // Get data from req body
            const {
                userId
            } = req.params;

            // Get data from url query parameter
            const username = req.query.username;

            let user;

            // if userId exists get by userId
            // else get user by username
            if (userId) {
                if (Types.ObjectId.isValid(userId))
                    user = await User.findById(userId);
            } else {
                user = await User.findOne({ username });
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