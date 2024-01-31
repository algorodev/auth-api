import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Auth API!')
})

app.listen(port, () => {
	console.log(`[API]: running at http://localhost:${port}`)
})
