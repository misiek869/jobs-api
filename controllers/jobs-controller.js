const Job = require('../models/job-model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
	res.send('getAllJobs')
}
const getSingleJob = async (req, res) => {
	res.send('getSingleJob')
}
const createJob = async (req, res) => {
	// from job-model createdBy
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
	res.send('updateJob')
}
const deleteJob = async (req, res) => {
	res.send('deleteJob')
}

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob }
