import fastify from 'fastify'
import cors from '@fastify/cors'
import { videosRoute } from '../modules/video/video.route'
import { catchRoute } from '../modules/catch/catch.route'
import { config } from './config'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export async function createServer() {
  const app = fastify()
  app.register(cors, {
    origin: [config.CLIENT_URL, 'http://localhost:3000'],
  })
  app.register(swagger)

  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
  })
  app.register(videosRoute, { prefix: '/api/videos' })
  app.register(catchRoute, { prefix: '/api/catches' })
  return app
}
