const User = require('../models/user-model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
	const user = await User.create({ ...req.body })

	const token = user.createJWT()

	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('Please prvide email and password')
	}

	const user = await User.findOne({ email })

	if (!user) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	const isPasswordMatching = await user.checkPassword(password)

	if (!isPasswordMatching) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }
