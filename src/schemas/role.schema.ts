import joi from 'joi'

export const createRoleSchema = joi.object({
	name: joi.string().required()
})

export const updateRoleByIdSchema = joi.object({
	isActive: joi.boolean().required()
})
