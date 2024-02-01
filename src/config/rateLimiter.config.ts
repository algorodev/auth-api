import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
	points: 10,
	duration: 1,
})

export default rateLimiter
