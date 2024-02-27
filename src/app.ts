import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import httpLogger from './config/httpLogger.config'
import { connectDatabase } from './database/dbconnect'
import swaggerOutput from './docs/api.json'
import errorMiddleware from './middlewares/error.middleware'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import router from './routes'

const app = express()

app.use(httpLogger)
app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())
app.use(helmet())
app.use(rateLimiterMiddleware)

app.use('/api', router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use(errorMiddleware)

connectDatabase()

export default app
