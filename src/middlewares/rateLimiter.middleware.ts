import { NextFunction, Response, Request } from 'express'
import rateLimiter from '../config/rateLimiter.config'
import { RESPONSE_CODES } from '../constants/global.contants'

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
	rateLimiter.consume(req.ip!)
		.then(() => {
			next()
		})
		.catch(() => {
			res.status(RESPONSE_CODES.TOO_MANY_REQUESTS).send('Too many requests!')
		})
}

export default rateLimiterMiddleware
