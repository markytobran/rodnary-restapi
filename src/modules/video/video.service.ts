import { FilterQuery } from 'mongoose'
import { Video, VideoModel } from './video.model'
import { CreateVideoBody } from './video.schema'

export async function getVideos(
  query: FilterQuery<Video>,
  skip: number,
  limit: number
) {
  return VideoModel.find(query).skip(skip).limit(limit)
}

export async function getVideoByID(id: string) {
  return VideoModel.findById(id)
}

export async function createVideo(input: CreateVideoBody): Promise<Video> {
  return VideoModel.create({
    ...input,
  })
}
