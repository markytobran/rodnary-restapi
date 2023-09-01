import { describe, it, vi, expect } from 'vitest'
import { createServer } from '../../../utils/createServer'
import * as CatchService from '../catch.service'
import { catchData } from './mock/catch'

describe("GET '/api/catch' route", async () => {
  const server = await createServer()
  await server.ready()

  const getCatchesSpy = vi.spyOn(CatchService, 'getCatches')

  it('calling the getVideo service returns all videos', async () => {
    const catches = [catchData, catchData, catchData]
    getCatchesSpy.mockResolvedValue(catches as any)
    const response = await server.inject({
      method: 'GET',
      url: '/api/catches',
    })

    expect(response.json()).toEqual(catches)
    expect(response.statusCode).toEqual(200)
  })

  it('calling the getVideo service, but error occurs', async () => {
    getCatchesSpy.mockRejectedValue('Oh no error')
    const response = await server.inject({
      method: 'GET',
      url: '/api/catches',
    })

    expect(response.json()).toEqual({ message: 'Error getting catches' })
    expect(response.statusCode).toEqual(500)
  })
})
