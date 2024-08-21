/**
 * 
 * @param {Object} error - error object
 * @param {Number} error.statusCode - error status code
 * @param {String} error.message - error message
 * @param {Response} res - response module
 * @return {Response} - return error message with http status code
 */
export const handleError = (error, res) => {
    const { statusCode, message } = error;

    try {
        return res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
        });
    
    } catch(error) {
        console.log(error.message)
    }
}

/**
 * 
 * @param {Object} sucess - sucess object
 * @param {Number} sucess.statusCode - sucess status code
 * @param {String} sucess.message - sucess message
 * @param {Response} res - response module
 * @return {Response} - return sucess message with http status code
 */
export const handleSuccess = (sucess, res) => {
    const { statusCode, message, data } = sucess;

    return res.status(statusCode).json({
        status: 'success',
        statusCode,
        message,
        data: data || null,
    })

}