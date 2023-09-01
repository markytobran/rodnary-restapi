import { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '../../utils/logger'
import { CreateCatchBody } from './catch.schema'
import { getCatches, createCatch } from './catch.service'
import cloudinary from '../../utils/cloudinary'

export async function getCatchesHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const videos = await getCatches()
    return reply.code(200).send(videos)
  } catch (e) {
    logger.error(e, 'getCatchesHandler: error getting catches')
    return reply.code(500).send({ message: 'Error getting catches' })
  }
}

export async function createCatchHandler(req: FastifyRequest<{ Body: CreateCatchBody }>, reply: FastifyReply) {
  try {
    const catchData = req.body

    const { secure_url } = await cloudinary.uploader.upload(catchData.imgSrc, {
      upload_preset: 'catch',
    })

    catchData.imgSrc = secure_url

    const video = await createCatch(catchData)
    return reply.code(201).send(video)
  } catch (e) {
    logger.error(e, 'createCatchHandler: error creating new catch report')
    return reply.code(500).send({ message: 'Error creating new catch report' })
  }
}
