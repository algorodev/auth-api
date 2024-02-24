import { Router } from 'express'
import appRoutes from './app.routes'

const router = Router()

router.use('/', appRoutes)

export default router

