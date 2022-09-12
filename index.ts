import fastify from 'fastify'
import { config } from './utils/config'
import { logger } from './utils/logger'
import { createServer } from './utils/createServer'
import { connectToDb, disconnectFromDb } from './utils/db'

const server = fastify()

server.get('/', async (request, reply) => {
  reply.code(200).send({ message: 'Hello world!' })
})

async function startServer() {
  const server = await createServer()

  server.listen({
    port: config.PORT,
    host: config.HOST,
  })

  await connectToDb()

  logger.info(`App is listening`)

  // for (let i = 0; i < signals.length; i++) {
  //   process.on(signals[i], () =>
  //     gracefulShutdown({
  //       signal: signals[i],
  //       server,
  //     })
  //   )
  // }
}

startServer()
