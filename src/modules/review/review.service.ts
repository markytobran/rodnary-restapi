import { Review, ReviewModel } from './review.model'
import { CreateReviewBody } from './review.schema'

export async function getReviews() {
  return ReviewModel.find()
}

export async function createReview(input: CreateReviewBody): Promise<Review> {
  return ReviewModel.create({
    ...input,
  })
}
