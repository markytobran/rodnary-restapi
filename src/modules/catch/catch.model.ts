import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose'

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Catch {
  @prop({ type: String, required: true })
  catchDate: string

  @prop({ type: String, required: true })
  fish: string

  @prop({ type: String, required: true })
  weight: string

  @prop({ type: String })
  length: string

  @prop({ type: String })
  district: string

  @prop({ type: String, required: true })
  method: string

  @prop({ type: String, required: true })
  bait: string

  @prop({ type: String, required: true })
  weather: string

  @prop({ type: String, required: true })
  dayPeriod: string

  @prop({ type: String, required: true })
  catchLocation: string

  @prop({ type: String, required: true })
  catchCircumstances: string

  @prop({ type: String, required: true })
  imgSrc: string

  @prop({ type: Boolean, required: true })
  acceptTermsAndConditions: boolean
}

export const CatchModel = getModelForClass(Catch)
