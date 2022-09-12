import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'

describe("GET '/api/video/:id' route", async () => {
  const server = await createServer()
  await server.ready()

  const getVideoByIDSpy = vi.spyOn(VideoService, 'getVideoByID')

  it('calling the getVideoByID service with valid _id returns the right video', async () => {
    const id = '6224aa48ff039311145329b7'
    getVideoByIDSpy.mockResolvedValue(video)
    const response = await server.inject({
      method: 'GET',
      url: '/api/video/' + id,
    })

    expect(response.json()).toEqual(video)
    expect(response.json()._id).toEqual(id)
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideoByID service with invalid id return 400', async () => {
    getVideoByIDSpy.mockResolvedValue(video)
    const response = await server.inject({
      method: 'GET',
      url: '/api/video/invalid-id',
    })

    expect(response.json()).toEqual({ message: 'Error video id is not valid' })
    expect(response.statusCode).toEqual(400)
  })

  it('calling the getVideoByID service with valid id but video not found', async () => {
    getVideoByIDSpy.mockResolvedValue(undefined)
    const response = await server.inject({
      method: 'GET',
      url: '/api/video/6224aa48ff039311145329b7',
    })

    expect(response.json()).toEqual({ message: 'Error video not found' })
    expect(response.statusCode).toEqual(404)
  })

  it('calling the getVideoByID service, but error occurs', async () => {
    getVideoByIDSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'GET',
      url: '/api/video/6224aa48ff039311145329b7',
    })

    expect(response.json()).toEqual({ message: 'Error getting videos' })
    expect(response.statusCode).toEqual(500)
  })
})
