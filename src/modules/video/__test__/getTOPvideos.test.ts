import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'

describe("GET '/api/video/topvideos/home' route", async () => {
  const server = await createServer()
  await server.ready()

  const getVideosSpy = vi.spyOn(VideoService, 'getVideos')

  it('calling the getVideo service returns the right videos for the home page', async () => {
    getVideosSpy.mockResolvedValueOnce([video, video])
    getVideosSpy.mockResolvedValueOnce([video, video])

    const response = await server.inject({
      method: 'GET',
      url: '/api/video/topvideos/home',
    })

    expect(response.json()).toEqual({ commercialVideos: [video, video], naturalVideos: [video, video] })
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideo service, but error occurs', async () => {
    getVideosSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'GET',
      url: '/api/video/topvideos/home',
    })

    expect(response.json()).toEqual({ message: 'Error getting TOP Videos for homepage' })
    expect(response.statusCode).toEqual(500)
  })
})
