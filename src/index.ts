import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'

import logger from './config/logger.config'
import httpLogger from './config/httpLogger.config'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import swaggerOutput from './docs/api.json'
import router from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

app.use(httpLogger)
app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())
app.use(helmet())
app.use(rateLimiterMiddleware)

app.use('/api', router)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.listen(port, () => {
	logger.debug(`running at http://localhost:${port}`, { port })
})
