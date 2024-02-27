import { Request } from 'express'

export interface RoleI {
	id: number
	name: string
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export type CreateRoleRequest = Request<null, null, Pick<RoleI, 'name'>, null>

export type UpdateRoleRequest = Request<Pick<RoleI, 'id'>, null, Pick<RoleI, 'isActive'>, null>

export type DeleteRoleRequest = Request<Pick<RoleI, 'id'>, null, null, null>
