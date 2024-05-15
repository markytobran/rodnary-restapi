import { FilterQuery } from 'mongoose'
import { Video, VideoModel } from './video.model'
import { CreateVideoBody } from './video.schema'

export async function getVideos(query: FilterQuery<Video>, skip: number, limit: number) {
  return VideoModel.find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select('_id title subtitles publishedAt description thumbnails videoLanguage subFishing water videoID channelId')
}

export async function getVideoByID(id: string) {
  return VideoModel.findById(id)
}

export async function deleteVideoByID(id: string) {
  return VideoModel.findByIdAndDelete(id)
}

export async function getVideosByTitleOrDescription(query: string, skip: number, limit: number) {
  return VideoModel.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }] })
    .sort({
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
}

export async function createVideo(input: CreateVideoBody): Promise<Video> {
  return VideoModel.create({
    ...input,
  })
}
