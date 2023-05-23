import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should hash be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: null,
      phone: null,
      latitude: -7.1498308,
      longitude: -34.8734516,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
