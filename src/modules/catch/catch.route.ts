import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createCatchHandler, getCatchesHandler } from './catch.controller'
import { createCatchSchema } from './catch.schema'

export function catchRoute(app: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  app.get('/', getCatchesHandler)
  app.post('/', { schema: createCatchSchema }, createCatchHandler)
  done()
}
