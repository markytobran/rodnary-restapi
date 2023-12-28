import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'

describe("GET '/api/videos' route", async () => {
  const server = await createServer()
  await server.ready()

  const getVideosSpy = vi.spyOn(VideoService, 'getVideos')

  it('calling the getVideos service returns all videos', async () => {
    const videos = [video, video, video]
    getVideosSpy.mockResolvedValue(videos as any)
    const response = await server.inject({
      method: 'GET',
      url: '/api/videos',
    })

    expect(response.json()).toEqual(videos)
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideos service, but error occurs', async () => {
    getVideosSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'GET',
      url: '/api/videos',
    })

    expect(response.json()).toEqual({ message: 'Error getting videos' })
    expect(response.statusCode).toEqual(500)
  })
})
