import express from 'express'
import httpLogger from './config/httpLogger.config'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import router from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from './docs/api.json'
import { connectDatabase } from './database/dbconnect'

const app = express()

app.use(httpLogger)
app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())
app.use(helmet())
app.use(rateLimiterMiddleware)

app.use('/api', router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

connectDatabase()

export default app
