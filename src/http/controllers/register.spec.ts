import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
