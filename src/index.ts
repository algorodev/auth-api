import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import logger from './config/logger.config'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Auth API!')
})

app.listen(port, () => {
	logger.debug(`running at http://localhost:${port}`, { port })
})
