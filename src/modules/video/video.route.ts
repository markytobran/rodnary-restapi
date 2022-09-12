import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import validateAPIkey from '../../middleware/validateAPIkey'
import {
  createVideoHandler,
  getVideosHandler,
  getTOPVideosHandler,
  getVideoHandler,
  getVideosByChannelIdHandler,
  getVideosByCategoryHandler,
} from './video.controller'
import {
  createVideoSchema,
  getVideoParamsSchema,
  getChannelIDParamsSchema,
  getChannelKeyParamsSchema,
} from './video.schema'

export function videosRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.get('/', getVideosHandler)
  app.post(
    '/',
    { preHandler: validateAPIkey, schema: createVideoSchema },
    createVideoHandler
  )
  app.get('/:id', { schema: getVideoParamsSchema }, getVideoHandler)
  app.get('/topvideos/home', getTOPVideosHandler)
  app.get(
    '/channel/:id',
    { schema: getChannelIDParamsSchema },
    getVideosByChannelIdHandler
  )
  app.get(
    '/category/:categoryKey/:value',
    { schema: getChannelKeyParamsSchema },
    getVideosByCategoryHandler
  )

  done()
}
