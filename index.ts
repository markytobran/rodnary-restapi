import fastify from 'fastify'
import { config } from './utils/config'

const server = fastify()

server.get('/', async (request, reply) => {
  reply.code(200).send({ message: 'Hello world!' })
})

server.listen({
  port: config.PORT,
  host: config.HOST,
})

console.log('lel')
