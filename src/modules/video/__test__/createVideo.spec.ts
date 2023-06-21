import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'
import { config } from '../../../utils/config'

describe("POST '/api/video' route", async () => {
  const server = await createServer()
  await server.ready()

  const createVideoSpy = vi.spyOn(VideoService, 'createVideo')
  createVideoSpy.mockResolvedValue(video)

  it('calling the createVideo service with the VALID API key and VALID body should return the video', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/videos',
      payload: video,
      headers: { authorization: config.API_KEY },
    })

    expect(createVideoSpy).toHaveBeenCalledWith(video)
    expect(response.json()).toEqual(video)
    expect(response.statusCode).toEqual(201)
  })

  it('calling the createVideo service with the VALID API key and INVALID body should return', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/videos',
      payload: {},
      headers: { authorization: config.API_KEY },
    })

    expect(response.json().statusCode).toEqual(400)
  })

  it('calling the createVideo service with the INVALID API key should return error message', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/videos',
      payload: video,
      headers: { authorization: 'Invalid API key' },
    })

    expect(response.json()).toEqual({ message: 'API key is not valid' })
  })

  it('calling the createVideo service with the VALID API key, but service error occurs should 500 error', async () => {
    createVideoSpy.mockRejectedValue('Server is down')
    const response = await server.inject({
      method: 'POST',
      url: '/api/videos',
      payload: video,
      headers: { authorization: config.API_KEY },
    })

    expect(response.statusCode).toEqual(500)
    expect(response.json()).toEqual({ message: 'Error creating new video' })
  })
})
