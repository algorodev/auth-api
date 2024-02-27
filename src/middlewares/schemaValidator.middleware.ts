import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import logger from '../config/logger.config'
import validationOptions from '../config/requestValidator.config'
import { RESPONSE_CODES } from '../constants/global.contants'

const schemaValidatorMiddleware = (schema: ObjectSchema) =>
	(req: Request, res: Response, next: NextFunction) => {
		logger.debug('schemaValidatorMiddleware', { body: req.body })
		const { error } = schema.validate(req.body, validationOptions)

		if (error) res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).send({ message: 'Invalid payload!', error })

		next()
	}

export default schemaValidatorMiddleware
