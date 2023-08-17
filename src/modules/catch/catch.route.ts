import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createCatchHandler } from './catch.controller'
import { createCatchSchema } from './catch.schema'

export function catchRoute(app: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  app.post('/', { schema: createCatchSchema }, createCatchHandler)

  done()
}
