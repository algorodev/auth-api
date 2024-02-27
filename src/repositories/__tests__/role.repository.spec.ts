import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import {
	queryCreateRole,
	queryDeleteRoleById,
	queryGetActiveRoles,
	queryGetAllRoles,
	queryUpdateRoleById,
} from '../role.repository'
import client from '../../database/client'

jest.mock('../../database/client', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})

const prismaMock = client as unknown as DeepMockProxy<PrismaClient>

describe('Role Repository', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('queryCreateRole', () => {
		it('should create role', async () => {
			prismaMock.$queryRaw.mockResolvedValue(1)

			await queryCreateRole('test')

			await expect(prismaMock.$queryRaw`SELECT * FROM fnc_create_role(test::varchar)`).resolves.toEqual(1)
		})
	})

	describe('queryGetAllRoles', () => {
		it('should return an array with all roles', async () => {
			prismaMock.$queryRaw.mockResolvedValue([])

			await queryGetAllRoles()

			await expect(prismaMock.$queryRaw`SELECT * FROM fnc_get_all_roles()`).resolves.toEqual([])
		})
	})

	describe('queryGetActiveRoles', () => {
		it('should return an array of active roles', async () => {
			prismaMock.$queryRaw.mockResolvedValue([])

			await queryGetActiveRoles()

			await expect(prismaMock.$queryRaw`SELECT * FROM fnc_get_active_roles()`).resolves.toEqual([])
		})
	})

	describe('queryUpdateRoleById', () => {
		it('should update role', async () => {
			prismaMock.$queryRaw.mockResolvedValue(1)

			await queryUpdateRoleById(1, true)

			await expect(prismaMock.$queryRaw`SELECT * FROM fnc_update_role_by_id(1::integer, true::boolean)`).resolves.toEqual(1)
		})
	})

	describe('queryDeleteRoleById', () => {
		it('should delete role', async () => {
			prismaMock.$queryRaw.mockResolvedValue(1)

			await queryDeleteRoleById(1)

			await expect(prismaMock.$queryRaw`SELECT * FROM fnc_delete_role_by_id(1::integer)`).resolves.toEqual(1)
		})
	})
})
