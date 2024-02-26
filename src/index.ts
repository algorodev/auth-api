import dotenv from 'dotenv'
import app from './app'
import logger from './config/logger.config'

dotenv.config()

const port = process.env.PORT ?? 3000

app.listen(port, () => {
	logger.debug(`running at http://localhost:${port}`, { port })
})


