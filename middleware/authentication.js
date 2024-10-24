const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const User = require('../models/user-model')

const authenticationMiddleware = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('Wrong authentication')
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const { name, userID } = decoded
		req.user = { userId: userID, name: name }
		next()
	} catch (error) {
		throw new UnauthenticatedError('Wrong authentication')
	}
}

module.exports = authenticationMiddleware
