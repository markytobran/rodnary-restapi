import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as VideoService from '../video.service'
import { video } from './mock/video'

describe("DELETE '/api/video/:id' route", async () => {
  const server = await createServer()
  await server.ready()

  const getVideoByIDSpy = vi.spyOn(VideoService, 'getVideoByID')
  const deleteVideoByIDSpy = vi.spyOn(VideoService, 'deleteVideoByID')

  it('calling the deleteVideo service with valid _id returns the right video', async () => {
    const id = '63239246b590a3934353949c'
    getVideoByIDSpy.mockResolvedValue(video as any)
    deleteVideoByIDSpy.mockResolvedValue(null)
    const response = await server.inject({
      method: 'DELETE',
      url: '/api/videos/' + id,
    })
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideoByID service with invalid id return 400', async () => {
    getVideoByIDSpy.mockResolvedValue(video as any)
    const response = await server.inject({
      method: 'DELETE',
      url: '/api/videos/invalid-id',
    })

    expect(response.json()).toEqual({ message: 'Error video id is not valid' })
    expect(response.statusCode).toEqual(400)
  })

  it('calling the deleteVideo service with valid id but video not found', async () => {
    getVideoByIDSpy.mockResolvedValue(null)
    const response = await server.inject({
      method: 'DELETE',
      url: '/api/videos/6224aa48ff039311145329b7',
    })

    expect(response.json()).toEqual({ message: 'Error video not found' })
    expect(response.statusCode).toEqual(404)
  })

  it('calling the deleteVideo service, but error occurs', async () => {
    getVideoByIDSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'DELETE',
      url: '/api/videos/6224aa48ff039311145329b7',
    })

    expect(response.json()).toEqual({ message: 'Error deleting video' })
    expect(response.statusCode).toEqual(500)
  })
})
