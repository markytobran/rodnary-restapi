import { Static, Type } from '@sinclair/typebox'

const Catch = Type.Object({
  _id: Type.String(),
  catchDate: Type.String(),
  fish: Type.String(),
  weight: Type.String(),
  length: Type.String(),
  district: Type.String(),
  method: Type.String(),
  bait: Type.String(),
  weather: Type.String(),
  dayPeriod: Type.String(),
  catchPlace: Type.String(),
  catchCircumstances: Type.String(),
  acceptTermsAndConditions: Type.Boolean(),
})

export const createCatchSchema = {
  description: 'Create a new catch',
  body: Type.Omit(Catch, ['_id']),
  response: {
    201: Catch,
  },
}

export type CreateCatchBody = Static<typeof createCatchSchema.body>
