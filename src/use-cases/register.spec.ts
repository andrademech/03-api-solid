import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

/**
 * Unit Test
 * 1. Teste unitário é um teste que testa uma unidade de código
 * 2. Uma unidade de código é uma função, um método, uma classe, um componente, etc
 * 3. Um teste unitário não deve depender de nada externo
 * 4. Um teste unitário deve ser rápido
 * 5. Um teste unitário deve ser isolado e nunca bater em um banco de dados, API, etc
 */

/**
 * usersRepository and registerUseCase are the system under test
 * they were repeating in each test, so we can use beforeEach to
 * set them up before each test
 * beforeEach is a function that runs before each test
 * it is a pattern to name the class that is being tested
 * so, we can use let instead of const to make it mutable
 * and set it up before each test
 */

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)

    console.log(user.password_hash)
  })

  it('should note be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
