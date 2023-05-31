import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    // create user
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    // authenticate
    const response = await request(app.server).post('/sessions').send({
      email: 'johndow@example.com',
      password: '123456',
    })

    // expect
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
