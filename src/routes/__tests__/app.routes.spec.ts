import request from 'supertest'
import app from '../../app'
import { RESPONSE_CODES } from '../../constants/global.contants'

describe('App Routes', () => {
	describe('Hello World', () => {
		it('should return status code OK and Hello World as text', async () => {
			const res = await request(app)
				.get('/api/')

			expect(res.statusCode).toEqual(RESPONSE_CODES.OK)
			expect(res.body.message).toEqual('Hello World')
		})
	})
})
