import morgan from 'morgan'
import logger from './logger.config'

const httpLogger = morgan(
	':method :url :status ":user-agent" - :response-time ms',
	{ stream: { write: (message) => logger.http(message.trim()) } }
)

export default httpLogger
