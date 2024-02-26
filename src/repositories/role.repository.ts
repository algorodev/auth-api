import logger from '../config/logger.config'
import { client } from '../database/dbconnect'
import { RoleI } from '../types/role.types'

export const queryCreateRole = async (name: string) => {
	logger.debug('queryCreateRole', { name })
	await client.$queryRaw`SELECT * FROM fnc_create_role(${name}::varchar)`
}

export const queryGetAllRoles = async () => {
	logger.debug('queryGetAllRoles')
	return client.$queryRaw<RoleI[]>`SELECT * FROM fnc_get_all_roles()`
}

export const queryGetActiveRoles = async () => {
	logger.debug('queryGetActiveRoles')
	return client.$queryRaw<RoleI[]>`SELECT * FROM fnc_get_active_roles()`
}

export const queryUpdateRoleById = async (roleId: number, isActive: boolean) => {
	logger.debug('queryUpdateRoleById', { roleId, isActive })
	await client.$queryRaw`SELECT * FROM fnc_update_role_by_id(${roleId}::integer, ${isActive}::boolean)`
}

export const queryDeleteRoleById = async (roleId: number) => {
	logger.debug('queryDeleteRoleById', { roleId })
	await client.$queryRaw`SELECT * FROM fnc_delete_role_by_id(${roleId}::integer)`
}
