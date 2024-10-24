const Job = require('../models/job-model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
	const userJobs = await Job.find({ createdBy: req.user.userId }).sort(
		'createdAt'
	)
	res.status(StatusCodes.OK).json({ userJobs, count: userJobs.length })
}

const getSingleJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req

	const job = await Job.findOne({
		_id: jobId,
		createdBy: userId,
	})

	if (!job) {
		throw new NotFoundError(`Can't find job with id${jobId}`)
	}

	res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
	// from job-model createdBy
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req

	if (company === '' || position === '') {
		throw new BadRequestError('Company or Position fields cannot be empty')
	}

	const job = await Job.findByIdAndUpdate(
		{ _id: jobId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	)

	if (!job) {
		throw new NotFoundError(`Can't find job with id${jobId}`)
	}

	res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req

	const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })

	if (!job) {
		throw new NotFoundError(`Can't find job with id${jobId}`)
	}

	res.status(StatusCodes.OK).send()
}

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob }
