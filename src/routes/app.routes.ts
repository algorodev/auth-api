import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
	res.send('hello world')
})

export default routes
