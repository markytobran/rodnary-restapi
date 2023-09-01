import envSchema from 'env-schema'
import { Type, Static } from '@sinclair/typebox'

const schema = Type.Object({
  PORT: Type.Number({
    default: 4000,
  }),
  HOST: Type.String({
    default: '0.0.0.0',
  }),
  DATABASE_URL: Type.String(),
  API_KEY: Type.String(),
  CLIENT_URL: Type.String(),
  CLOUDINARY_CLOUD_NAME: Type.String(),
  CLOUDINARY_API_KEY: Type.String(),
  CLOUDINARY_API_SECRET: Type.String(),
})

type Env = Static<typeof schema>

export const config = envSchema<Env>({
  schema,
  dotenv: true,
})
