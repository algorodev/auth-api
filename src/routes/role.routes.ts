import { Router } from 'express'
import {
	createRoleHandler,
	deleteRoleByIdHandler,
	getActiveRolesHandler,
	getAllRolesHandler,
	updateRoleByIdHandler,
} from '../controllers/role.controller'

const routes = Router()

routes.post('/', createRoleHandler)
routes.get('/', getAllRolesHandler)
routes.get('/active', getActiveRolesHandler)
routes.put('/:id', updateRoleByIdHandler)
routes.delete('/:id', deleteRoleByIdHandler)

export default routes
