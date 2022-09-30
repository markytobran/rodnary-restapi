import fastify from 'fastify'
import { videosRoute } from '../modules/video/video.route'

export async function createServer() {
  const app = fastify()

  app.register(videosRoute, { prefix: '/api/videos' })
  return app
}
