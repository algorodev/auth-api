import { PrismaClient } from '@prisma/client'
import logger from '../config/logger.config'

export const client = new PrismaClient()

export const connectDatabase = () => {
	try {
		client.$connect()
		logger.debug('database connection success!')
	} catch (error: any) {
		client.$disconnect()
		logger.error(error.message)
	}
}
