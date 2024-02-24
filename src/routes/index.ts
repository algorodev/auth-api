import { Express } from 'express'
import appRoutes from './app.routes'

export const setApiRoutes = (app: Express) => {
	app.use('/api', appRoutes)
}
