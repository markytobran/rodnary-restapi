import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createReviewHandler, getReviewsHandler } from './review.controller'
import { createReviewSchema } from './review.schema'

export function reviewRoute(app: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  app.get('/', getReviewsHandler)
  app.post('/', { schema: createReviewSchema }, createReviewHandler)
  done()
}
