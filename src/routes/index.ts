import { Router } from 'express'
import appRoutes from './app.routes'
import roleRoutes from './role.routes'

const router = Router()

router.use('/', appRoutes)
router.use('/role', roleRoutes)

export default router

