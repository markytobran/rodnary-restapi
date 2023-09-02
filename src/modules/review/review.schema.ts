import { Static, Type } from '@sinclair/typebox'

const Review = Type.Object({
  _id: Type.String(),
  gearType: Type.String(),
  name: Type.String(),
  brand: Type.String(),
  castingWeight: Type.String(),
  reviewText: Type.String(),
  weight: Type.String(),
  imgSrc: Type.String(),
})

export const createReviewSchema = {
  description: 'Create a new review',
  body: Type.Omit(Review, ['_id']),
  response: {
    201: Review,
  },
}

export type CreateReviewBody = Static<typeof createReviewSchema.body>
