import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose'

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Video {
  @prop({ type: String, required: true })
  title: string

  @prop({ type: String, required: true })
  channelTitle: string

  @prop({ type: String, required: true })
  channelId: string

  @prop({ type: String })
  description: string

  @prop({ type: String })
  logoURL: string

  @prop({ type: String, required: true })
  videoID: string

  @prop({ type: String, required: true })
  venue: string

  @prop({ type: String, required: true })
  water: string

  @prop({ type: String, required: true })
  fishing: string

  @prop({ type: String, required: true })
  subFishing: string

  @prop({ type: String, required: true })
  publishedAt: string

  @prop({ type: String, required: true })
  videoLanguage: string

  @prop({ type: Array, required: true })
  subtitles: [string]

  @prop({ type: Number, required: true })
  likes: number

  @prop({ type: Array, required: true })
  thumbnails: [{ name: string; url: string }]

  @prop({ type: Array, required: true })
  socialLinks: [{ name: string; url: string }]

  @prop({ type: String })
  coverImgLink: string
}

export const VideoModel = getModelForClass(Video)
