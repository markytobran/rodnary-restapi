import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
  reply.code(200).send({ message: 'Hello world!' })
})

server.listen({
  port: process.env.PORT || 8080,
  host: '0.0.0.0',
})

console.log('lel')
