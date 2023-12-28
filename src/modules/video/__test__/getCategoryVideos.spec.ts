import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'

describe("GET '/api/video/category/:categoryKey/:value' route", async () => {
  const server = await createServer()
  await server.ready()

  const getVideosSpy = vi.spyOn(VideoService, 'getVideos')

  it('calling the getVideos service returns the right videos for the category', async () => {
    getVideosSpy.mockResolvedValueOnce([video, video] as any)

    const response = await server.inject({
      method: 'GET',
      url: '/api/videos/categories/fishing/feeder',
    })

    expect(response.json()).toEqual([video, video])
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideos service, but error occurs', async () => {
    getVideosSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'GET',
      url: '/api/videos/categories/fishing/feeder',
    })

    expect(response.json()).toEqual({ message: 'Error getting videos by category' })
    expect(response.statusCode).toEqual(500)
  })
})
