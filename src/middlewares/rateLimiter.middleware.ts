import { NextFunction, Response, Request } from 'express'
import rateLimiter from '../config/rateLimiter.config'

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
	rateLimiter.consume(req.ip!)
		.then(() => {
			next()
		})
		.catch(() => {
			res.status(429).send('Too many requests!')
		})
}

export default rateLimiterMiddleware
