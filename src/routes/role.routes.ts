import { Router } from 'express'
import {
	createRoleHandler,
	deleteRoleByIdHandler,
	getActiveRolesHandler,
	getAllRolesHandler,
	updateRoleByIdHandler,
} from '../controllers/role.controller'
import schemaValidatorMiddleware from '../middlewares/schemaValidator.middleware'
import { createRoleSchema, updateRoleByIdSchema } from '../schemas/role.schema'

const routes = Router()

routes.post('/', schemaValidatorMiddleware(createRoleSchema), createRoleHandler)
routes.get('/', getAllRolesHandler)
routes.get('/active', getActiveRolesHandler)
routes.put('/:id', schemaValidatorMiddleware(updateRoleByIdSchema), updateRoleByIdHandler)
routes.delete('/:id', deleteRoleByIdHandler)

export default routes
