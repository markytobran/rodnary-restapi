import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import validateAPIkey from '../../middleware/validateAPIkey'
import {
  createVideoHandler,
  getVideosHandler,
  getTOPVideosHandler,
  getVideoHandler,
  getVideosByChannelIdHandler,
  getVideosByCategoryHandler,
  getAllVideosHomeHandler,
  getVideosBySearchQuery,
} from './video.controller'
import { createVideoSchema, getVideoParamsSchema, getChannelIDParamsSchema, getChannelKeyParamsSchema } from './video.schema'

export function videosRoute(app: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  app.get('/', getVideosHandler)
  app.post('/', { preHandler: validateAPIkey, schema: createVideoSchema }, createVideoHandler)
  app.get('/:id', { schema: getVideoParamsSchema }, getVideoHandler)
  app.get('/topvideos', getTOPVideosHandler)
  app.get('/channels/:id', { schema: getChannelIDParamsSchema }, getVideosByChannelIdHandler)
  app.get('/categories/:categoryKey/:value', { schema: getChannelKeyParamsSchema }, getVideosByCategoryHandler)
  app.get('/allvideos', getAllVideosHomeHandler)
  app.get('/search', getVideosBySearchQuery)

  done()
}
