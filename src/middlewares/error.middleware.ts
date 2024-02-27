import { Request, Response } from 'express'
import logger from '../config/logger.config'
import { RESPONSE_CODES } from '../constants/global.contants'

const errorMiddleware = (err: Error, req: Request, res: Response) => {
	logger.error(err)
	res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send({ error: err.message })
}

export default errorMiddleware
