import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'

import logger from './config/logger.config'
import httpLogger from './config/httpLogger.config'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(httpLogger)
app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())
app.use(helmet())
app.use(rateLimiterMiddleware)

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Auth API!')
})

app.listen(port, () => {
	logger.debug(`running at http://localhost:${port}`, { port })
})
