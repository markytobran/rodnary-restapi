import fastify from 'fastify'
import cors from '@fastify/cors'
import { videosRoute } from '../modules/video/video.route'
import { catchRoute } from '../modules/catch/catch.route'

export async function createServer() {
  const app = fastify()
  app.register(cors)
  app.register(videosRoute, { prefix: '/api/videos' })
  app.register(catchRoute, { prefix: '/api/catches' })
  return app
}
