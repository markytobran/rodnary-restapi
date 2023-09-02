import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose'

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Review {
  @prop({ type: String, required: true })
  gearType: string
  @prop({ type: String, required: true })
  name: string
  @prop({ type: String, required: true })
  brand: string
  @prop({ type: String, required: true })
  castingWeight: string
  @prop({ type: String, required: true })
  reviewText: string
  @prop({ type: String, required: true })
  weight: string
  @prop({ type: String, required: true })
  imgSrc: string
}

export const ReviewModel = getModelForClass(Review)
