import { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '../../utils/logger'
import { CreateReviewBody } from './review.schema'
import { getReviews, createReview } from './review.service'
import cloudinary from '../../utils/cloudinary'

export async function getReviewsHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const reviews = await getReviews()
    return reply.code(200).send(reviews)
  } catch (e) {
    logger.error(e, 'getReviewsHandler: error getting reviews')
    return reply.code(500).send({ message: 'Error getting reviews' })
  }
}

export async function createReviewHandler(req: FastifyRequest<{ Body: CreateReviewBody }>, reply: FastifyReply) {
  try {
    const reviewData = req.body

    const { secure_url } = await cloudinary.uploader.upload(reviewData.imgSrc, {
      upload_preset: 'review',
    })

    reviewData.imgSrc = secure_url

    const review = await createReview(reviewData)
    return reply.code(201).send(review)
  } catch (e) {
    logger.error(e, 'createReviewHandler: error creating new review')
    return reply.code(500).send({ message: 'Error creating new review' })
  }
}
