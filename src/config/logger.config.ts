import { createLogger, format, transports } from 'winston'
import dotenv from 'dotenv'

dotenv.config()

const { align, colorize, combine, printf, timestamp } = format
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss'
const logLevels = {
	error: 0,
	warn: 1,
	http: 2,
	debug: 3,
}

const loggerFormat = combine(
	colorize({ all: true }),
	timestamp({ format: timestampFormat }),
	align(),
	printf(({ level, timestamp, message, ...data }) =>
		`[${timestamp}] ${level}: ${message} ${JSON.stringify(data)}`
	),
)

const loggerTransports = [
	new transports.File({ filename: 'error.log', level: 'error' }),
	new transports.Console()
]

const loggerHandlers = [
	new transports.File({ filename: 'exception.log' })
]

const logger = createLogger({
	levels: logLevels,
	level: process.env.LOG_LEVEL || 'debug',
	format: loggerFormat,
	transports: loggerTransports,
	exceptionHandlers: loggerHandlers,
	rejectionHandlers: loggerHandlers,
	exitOnError: false,
})

export default logger
