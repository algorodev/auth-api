import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import logger from './config/logger.config'
import httpLogger from './config/httpLogger.config'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(httpLogger)

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Auth API!')
})

app.listen(port, () => {
	logger.debug(`running at http://localhost:${port}`, { port })
})
