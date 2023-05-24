import 'dotenv/config'

// validate env variables

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid env variables!', _env.error.format())

  // doenst permit the server to start
  throw new Error('Invalid env variables!')
}

export const env = _env.data
