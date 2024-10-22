const { CustomAPIError } = require('../errors')

const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong...',
	}

	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ mgs: err.message })
	// }

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field. Please choose another value`
		customError.statusCode = 400
	}
	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
