import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		version: '0.0.1',
		title: 'Authentication API',
		description: 'Authentication API created with NodeJS, Express, TypeScript and PostgreSQL'
	},
	servers: [
		{ url: 'http://localhost:3030/api', description: 'Local Server' }
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer'
			}
		}
	}
}

const outputFile = '../docs/api.json'
const endpointFiles = ['./src/routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc)
