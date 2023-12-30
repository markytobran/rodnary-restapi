import { FastifyReply, FastifyRequest } from 'fastify'
import { config } from '../utils/config'
import { logger } from '../utils/logger'

const validateAPIkey = <TBody = {}, TParams = {}>(req: FastifyRequest<{ Body: TBody; Params: TParams }>, reply: FastifyReply, done: () => void) => {
  try {
    const isTokenValid = config.API_KEY === req.headers.authorization

    if (!isTokenValid) {
      return reply.code(403).send({ message: 'API key is not valid' })
    }

    done()
  } catch (e) {
    logger.error(e, 'validateAPIkey: error validating the API key')
    return reply.code(500).send({ message: 'Error validating the API key' })
  }
}

export default validateAPIkey
