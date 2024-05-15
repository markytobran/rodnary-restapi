import { Static, Type } from '@sinclair/typebox'

const Video = Type.Object({
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

const skipLimitQuery = Type.Object({
  limit: Type.Number(),
  skip: Type.Number(),
})

const params = Type.Object({
  id: Type.String(),
})

const searchQuery = Type.Object({
  q: Type.String(),
  limit: Type.Number(),
  skip: Type.Number(),
})

const channelParams = Type.Object({
  categoryKey: Type.String(),
  value: Type.String(),
})

export const createVideoSchema = {
  description: 'Create a new fishing video',
  body: Type.Omit(Video, ['_id']),
  response: {
    201: Video,
  },
}

export const getVideoParamsSchema = {
  description: 'Get a fishing video by id',
  params,
  response: {
    200: Video,
  },
}

export const deleteVideoParamsSchema = {
  description: 'Delete a fishing video by id',
  params,
  response: {
    200: Type.Object({
      message: Type.String(),
    }),
  },
}

export const getChannelIDParamsSchema = {
  description: 'Get fishing videos by channel id',
  params,
  response: {
    200: Type.Array(Video),
  },
}

export const getChannelKeyParamsSchema = {
  description: 'Get fishing videos by channel name and value',
  params: channelParams,
  response: {
    200: Type.Array(Video),
  },
}

export const getVideosBySearchQueries = {
  description: 'Get fishing videos by search query',
  query: searchQuery,
  response: {
    200: Type.Array(Video),
  },
}

export type CreateVideoBody = Static<typeof createVideoSchema.body>
export type GetVideoParams = Static<typeof getVideoParamsSchema.params>
export type DeleteVideoParams = Static<typeof deleteVideoParamsSchema.params>
export type GetChannelIDParams = Static<typeof getChannelIDParamsSchema.params>
export type GetChannelKeyParams = Static<typeof getChannelKeyParamsSchema.params>
export type GetVideoBySearchQuery = Static<typeof getVideosBySearchQueries.query>
export type GetSkipLimitQuery = Static<typeof skipLimitQuery>

export const baseVideoFields = '_id title subtitles publishedAt description thumbnails videoLanguage subFishing water'
