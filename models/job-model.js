const { required } = require('joi')
const mongoose = require('mongoose')
const JobSchema = require('../models/')

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please provide company name'],
			minlength: 2,
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please provide position'],
			minlength: 2,
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
)

module.exports = JobSchema
