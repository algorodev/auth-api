import { NextFunction, Request, Response } from 'express'
import logger from '../config/logger.config'
import { RESPONSE_CODES } from '../constants/global.contants'
import {
	queryCreateRole,
	queryDeleteRoleById,
	queryGetActiveRoles,
	queryGetAllRoles,
	queryUpdateRoleById,
} from '../repositories/role.repository'

export const createRoleHandler = async ({ body }: Request, res: Response, next: NextFunction) => {
	try {
		logger.debug('createRoleHandler', { body: body.name })
		await queryCreateRole(body.name)
		res.status(RESPONSE_CODES.CREATED).send({ message: 'Role has been successfully created' })
	} catch (error: any) {
		next(error)
	}
}

export const getAllRolesHandler = async (_: Request, res: Response, next: NextFunction) => {
	try {
		logger.debug('getAllRolesHandler')
		const result = await queryGetAllRoles()
		res.status(RESPONSE_CODES.OK).send({ roles: result })
	} catch (error: any) {
		next(error)
	}
}

export const getActiveRolesHandler = async (_: Request, res: Response, next: NextFunction) => {
	try {
		logger.debug('getActiveRolesHandler')
		const result = await queryGetActiveRoles()
		res.status(RESPONSE_CODES.OK).send({ roles: result })
	} catch (error: any) {
		next(error)
	}
}

export const updateRoleByIdHandler = async ({ body, params }: Request, res: Response, next: NextFunction) => {
	try {
		logger.debug('updateRoleByIdHandler', { body: body.isActive, params: params.id })
		await queryUpdateRoleById(+params.id, body.isActive)
		res.status(RESPONSE_CODES.OK).send({ message: 'Role has been successfully updated' })
	} catch (error: any) {
		next(error)
	}
}

export const deleteRoleByIdHandler = async ({ params }: Request, res: Response, next: NextFunction) => {
	try {
		logger.debug('deleteRoleByIdHandler', { params: params.id })
		await queryDeleteRoleById(+params.id)
		res.status(RESPONSE_CODES.OK).send({ message: 'Role has been successfully deleted' })
	} catch (error: any) {
		next(error)
	}
}
