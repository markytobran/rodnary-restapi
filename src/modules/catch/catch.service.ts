import { Catch, CatchModel } from './catch.model'
import { CreateCatchBody } from './catch.schema'

export async function getCatches() {
  return CatchModel.find()
}

export async function createCatch(input: CreateCatchBody): Promise<Catch> {
  return CatchModel.create({
    ...input,
  })
}
