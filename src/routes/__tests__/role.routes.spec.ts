import request from 'supertest'
import app from '../../app'
import { RESPONSE_CODES } from '../../constants/global.contants'

describe('Role Routes', () => {
	describe('[POST] /api/role/', () => {
		it('should return status code CREATED and a message', async () => {
			const { body: previousRoles } = await request(app)
				.get('/api/role/')

			const { body, status } = await request(app)
				.post('/api/role/')
				.send({ name: 'test' })

			const { body: actualRoles } = await request(app)
				.get('/api/role/')

			expect(previousRoles.roles).toHaveLength(3)
			expect(status).toEqual(RESPONSE_CODES.CREATED)
			expect(body).toEqual({ message: 'Role has been successfully created' })
			expect(actualRoles.roles).toHaveLength(4)
		})
	})

	describe('[GET] /api/role/', () => {
		it('should return status code OK and an array of roles', async () => {
			const { body, status } = await request(app)
				.get('/api/role/')

			expect(status).toEqual(RESPONSE_CODES.OK)
			expect(body.roles).toHaveLength(4)
		})
	})

	describe('[GET] /api/role/active/', () => {
		it('should return status code OK and an array of active roles', async () => {
			const { body, status } = await request(app)
				.get('/api/role/active')

			expect(status).toEqual(RESPONSE_CODES.OK)
			expect(body.roles).toHaveLength(4)
		})
	})

	describe('[PUT] /api/role/:id', () => {
		it('should return status code OK and a message', async () => {
			const { body: previousActiveRoles } = await request(app)
				.get('/api/role/active')

			const { body, status } = await request(app)
				.put('/api/role/4')
				.send({ isActive: false })

			const { body: actualActiveRoles } = await request(app)
				.get('/api/role/active')

			expect(previousActiveRoles.roles).toHaveLength(4)
			expect(status).toEqual(RESPONSE_CODES.OK)
			expect(body).toEqual({ message: 'Role has been successfully updated' })
			expect(actualActiveRoles.roles).toHaveLength(3)
		})
	})

	describe('[DELETE] /api/role/:id', () => {
		it('should return status code OK and a message', async () => {
			const { body: previousRoles } = await request(app)
				.get('/api/role/')
				.expect(RESPONSE_CODES.OK)

			const { body, status } = await request(app)
				.delete('/api/role/4')

			const { body: actualRoles } = await request(app)
				.get('/api/role')
				.expect(RESPONSE_CODES.OK)

			expect(previousRoles.roles).toHaveLength(4)
			expect(status).toEqual(RESPONSE_CODES.OK)
			expect(body).toEqual({ message: 'Role has been successfully deleted' })
			expect(actualRoles.roles).toHaveLength(3)
		})
	})
})
