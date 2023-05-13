import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(CheckInsRepository)
  })
  it('should hash be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '123',
      userId: '123',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
