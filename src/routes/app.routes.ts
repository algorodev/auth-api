import express from 'express'
import { RESPONSE_CODES } from '../constants/global.contants'

const routes = express.Router()

routes.get('/', (req, res) => {
	res.status(RESPONSE_CODES.OK).send({ message: 'Hello World' })
})

export default routes
