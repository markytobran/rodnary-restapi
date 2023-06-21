import { Static, Type } from '@sinclair/typebox'

const video = Type.Object({
  _id: Type.String(),
  title: Type.String(),
  channelTitle: Type.String(),
  channelId: Type.String(),
  description: Type.String(),
  logoURL: Type.String(),
  videoID: Type.String(),
  venue: Type.String(),
  water: Type.String(),
  fishing: Type.String(),
  subFishing: Type.String(),
  publishedAt: Type.String(),
  videoLanguage: Type.String(),
  subtitles: Type.Array(Type.String()),
  likes: Type.Number(),
  thumbnails: Type.Array(Type.Object({ name: Type.String(), url: Type.String() })),
  socialLinks: Type.Array(Type.Object({ name: Type.String(), url: Type.String() })),
  coverImgLink: Type.String(),
})

const params = Type.Object({
  id: Type.String(),
})

const searchQuery = Type.Object({
  q: Type.String(),
})

const channelParams = Type.Object({
  categoryKey: Type.String(),
  value: Type.String(),
})

export const createVideoSchema = {
  description: 'Create a new fishing video',
  body: Type.Omit(video, ['_id']),
  response: {
    201: video,
  },
}

export const getVideoParamsSchema = {
  description: 'Get a fishing video by id',
  params,
  response: {
    200: video,
  },
}

export const getChannelIDParamsSchema = {
  description: 'Get fishing videos by channel id',
  params,
  response: {
    200: Type.Array(video),
  },
}

export const getChannelKeyParamsSchema = {
  description: 'Get fishing videos by channel name and value',
  params: channelParams,
  response: {
    200: Type.Array(video),
  },
}

export const getVideosBySearchQueries = {
  description: 'Get fishing videos by search query',
  query: searchQuery,
  response: {
    200: Type.Array(video),
  },
}

export type CreateVideoBody = Static<typeof createVideoSchema.body>
export type GetVideoParams = Static<typeof getVideoParamsSchema.params>
export type GetChannelIDParams = Static<typeof getChannelIDParamsSchema.params>
export type GetChannelKeyParams = Static<typeof getChannelKeyParamsSchema.params>
export type GetVideoBySearchQuery = Static<typeof getVideosBySearchQueries.query>
