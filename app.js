require('dotenv').config()
require('express-async-errors')

// extra packages
const helmet = require('helmet')
const xss = require('xss-clean')

const express = require('express')
const app = express()

// connect to DB
const connectDB = require('./db/connect')

const authenticationMiddleware = require('./middleware/authentication')

// routes
const authRouter = require('./routes/auth-route')
const jobsRouter = require('./routes/jobs-route')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(helmet())
app.use(xss())

// app.get('/', (req, res) => {
// 	res.send('<h1>Welocme</h1>')
// })

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
