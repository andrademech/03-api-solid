import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let CheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(CheckInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia 1',
      description: '',
      latitude: new Decimal(-7.1498308),
      longitude: new Decimal(-34.8734516),
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.1498308,
      userLongitude: -34.8734516,
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  /**
   * TDD -> Test Driven Development
   * RED -> GREEN -> REFACTOR
   * 1. Escrever o teste e ver ele falhar
   * 2. Fazer o teste passar
   * 3. Refatorar o código
   */

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.1498308,
      userLongitude: -34.8734516,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.1498308,
        userLongitude: -34.8734516,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.1498308,
      userLongitude: -34.8734516,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.1498308,
      userLongitude: -34.8734516,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia 1',
      description: '',
      latitude: new Decimal(-7.1703849),
      longitude: new Decimal(-34.8687023),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -7.1498308,
        userLongitude: -34.8734516,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
