import { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '../../utils/logger'
import { CreateCatchBody } from './catch.schema'
import { createCatch } from './catch.service'

export async function createCatchHandler(req: FastifyRequest<{ Body: CreateCatchBody }>, reply: FastifyReply) {
  try {
    const video = await createCatch(req.body)
    return reply.code(201).send(video)
  } catch (e) {
    logger.error(e, 'createCatchHandler: error creating new catch report')
    return reply.code(500).send({ message: 'Error creating new catch report' })
  }
}
