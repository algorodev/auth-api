import { Request, Response } from 'express'
import logger from '../config/logger.config'
import { RESPONSE_CODES } from '../constants/global.contants'
import {
	queryCreateRole,
	queryDeleteRoleById,
	queryGetActiveRoles,
	queryGetAllRoles,
	queryUpdateRoleById,
} from '../repositories/role.repository'
import {
	CreateRoleRequest,
	DeleteRoleRequest,
	UpdateRoleRequest
} from '../types/role.types'

export const createRoleHandler = async ({ body }: CreateRoleRequest, res: Response) => {
	try {
		logger.debug('createRoleHandler', { body: body.name })
		await queryCreateRole(body.name)
		res.status(RESPONSE_CODES.CREATED).send('Role has been successfully created')
	} catch (error: any) {
		logger.error('createRoleHandler', { error: error.message })
		res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(error)
	}
}

export const getAllRolesHandler = async (_: Request, res: Response) => {
	try {
		logger.debug('getAllRolesHandler')
		const result = await queryGetAllRoles()
		res.status(RESPONSE_CODES.OK).send({ roles: result })
	} catch (error: any) {
		logger.debug('getAllRolesHandler')
		res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(error)
	}
}

export const getActiveRolesHandler = async (_: Request, res: Response) => {
	try {
		logger.debug('getActiveRolesHandler')
		const result = await queryGetActiveRoles()
		res.status(RESPONSE_CODES.OK).send({ roles: result })
	} catch (error: any) {
		logger.debug('getActiveRolesHandler')
		res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(error)
	}
}

export const updateRoleByIdHandler = async ({ body, params }: UpdateRoleRequest, res: Response) => {
	try {
		logger.debug('updateRoleByIdHandler', { body: body.isActive, params: params.id })
		await queryUpdateRoleById(params.id, body.isActive)
		res.status(RESPONSE_CODES.OK).send('Role has been successfully updated')
	} catch (error: any) {
		logger.error('updateRoleByIdHandler', { error: error.message })
		res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(error)
	}
}

export const deleteRoleByIdHandler = async ({ params }: DeleteRoleRequest, res: Response) => {
	try {
		logger.debug('deleteRoleByIdHandler', { params: params.id })
		await queryDeleteRoleById(params.id)
		res.status(RESPONSE_CODES.OK).send('Role has been successfully deleted')
	} catch (error: any) {
		logger.error('deleteRoleByIdHandler', { error: error.message })
		res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(error)
	}
}
