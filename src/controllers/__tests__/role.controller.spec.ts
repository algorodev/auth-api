import { Request, Response } from 'express'
import { RESPONSE_CODES } from '../../constants/global.contants'
import {
	queryCreateRole,
	queryDeleteRoleById,
	queryGetActiveRoles,
	queryGetAllRoles,
	queryUpdateRoleById,
} from '../../repositories/role.repository'
import {
	createRoleHandler,
	deleteRoleByIdHandler,
	getActiveRolesHandler,
	getAllRolesHandler,
	updateRoleByIdHandler,
} from '../role.controller'
import { CreateRoleRequest, DeleteRoleRequest, UpdateRoleRequest } from '../../types/role.types'

jest.mock('../../repositories/role.repository', () => ({
	queryCreateRole: jest.fn(),
	queryGetAllRoles: jest.fn(),
	queryGetActiveRoles: jest.fn(),
	queryUpdateRoleById: jest.fn(),
	queryDeleteRoleById: jest.fn(),
}))

describe('Role Controller', () => {
	const req = {
		body: { name: 'test', isActive: true },
		params: { id: '1' }
	} as Partial<Request>
	const res = {} as Partial<Response>

	res.send = jest.fn().mockReturnValue(res)
	res.sendStatus = jest.fn().mockReturnValue(res)
	res.status = jest.fn().mockReturnValue(res)
	res.json = jest.fn().mockReturnValue(res)
	res.end = jest.fn().mockReturnValue(res)

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('createRoleHandler', () => {
		it('should create role and return OK', async () => {
			;(queryCreateRole as jest.Mock).mockResolvedValue(void 0)

			await createRoleHandler(
				req as unknown as CreateRoleRequest,
				res as Response
			)

			expect(queryCreateRole).toHaveBeenCalledTimes(1)
			expect(queryCreateRole).toHaveBeenCalledWith('test')
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.CREATED)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ message: 'Role has been successfully created' })
		})

		it('should not create role and return INTERNAL SERVER ERROR', async () => {
			;(queryCreateRole as jest.Mock).mockRejectedValue({ message: 'someError' })

			await createRoleHandler(
				req as unknown as CreateRoleRequest,
				res as Response
			)

			expect(queryCreateRole).toHaveBeenCalledTimes(1)
			expect(queryCreateRole).toHaveBeenCalledWith('test')
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ error: { message: 'someError' } })
		})
	})

	describe('getAllRolesHandler', () => {
		it('should return an array of roles', async () => {
			;(queryGetAllRoles as jest.Mock).mockResolvedValue([])

			await getAllRolesHandler(
				req as Request,
				res as Response
			)

			expect(queryGetAllRoles).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.OK)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ roles: [] })
		})

		it('should not return an array of roles and return INTERNAL SERVER ERROR', async () => {
			;(queryGetAllRoles as jest.Mock).mockRejectedValue({ message: 'someError' })

			await getAllRolesHandler(
				req as Request,
				res as Response
			)

			expect(queryGetAllRoles).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ error: { message: 'someError' } })
		})
	})

	describe('getActiveRolesHandler', () => {
		it('should return an array of roles', async () => {
			;(queryGetActiveRoles as jest.Mock).mockResolvedValue([])

			await getActiveRolesHandler(
				req as Request,
				res as Response
			)

			expect(queryGetActiveRoles).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.OK)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ roles: [] })
		})

		it('should not return an array of roles and return INTERNAL SERVER ERROR', async () => {
			;(queryGetActiveRoles as jest.Mock).mockRejectedValue({ message: 'someError' })

			await getActiveRolesHandler(
				req as Request,
				res as Response
			)

			expect(queryGetActiveRoles).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ error: { message: 'someError' } })
		})
	})

	describe('updateRoleByIdHandler', () => {
		it('should create role and return OK', async () => {
			;(queryUpdateRoleById as jest.Mock).mockResolvedValue(void 0)

			await updateRoleByIdHandler(
				req as unknown as UpdateRoleRequest,
				res as Response
			)

			expect(queryUpdateRoleById).toHaveBeenCalledTimes(1)
			expect(queryUpdateRoleById).toHaveBeenCalledWith('1', true)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.OK)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ message: 'Role has been successfully updated' })
		})

		it('should not create role and return INTERNAL SERVER ERROR', async () => {
			;(queryUpdateRoleById as jest.Mock).mockRejectedValue({ message: 'someError' })

			await updateRoleByIdHandler(
				req as unknown as UpdateRoleRequest,
				res as Response
			)

			expect(queryUpdateRoleById).toHaveBeenCalledTimes(1)
			expect(queryUpdateRoleById).toHaveBeenCalledWith('1', true)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ error: { message: 'someError' } })
		})
	})

	describe('deleteRoleByIdHandler', () => {
		it('should create role and return OK', async () => {
			;(queryDeleteRoleById as jest.Mock).mockResolvedValue(void 0)

			await deleteRoleByIdHandler(
				req as unknown as DeleteRoleRequest,
				res as Response
			)

			expect(queryDeleteRoleById).toHaveBeenCalledTimes(1)
			expect(queryDeleteRoleById).toHaveBeenCalledWith('1')
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.OK)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ message: 'Role has been successfully deleted' })
		})

		it('should not create role and return INTERNAL SERVER ERROR', async () => {
			;(queryDeleteRoleById as jest.Mock).mockRejectedValue({ message: 'someError' })

			await deleteRoleByIdHandler(
				req as unknown as DeleteRoleRequest,
				res as Response
			)

			expect(queryDeleteRoleById).toHaveBeenCalledTimes(1)
			expect(queryDeleteRoleById).toHaveBeenCalledWith('1')
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
			expect(res.send).toHaveBeenCalledTimes(1)
			expect(res.send).toHaveBeenCalledWith({ error: { message: 'someError' } })
		})
	})
})
