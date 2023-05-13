import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

// Unit Test
// 1. Teste unitário é um teste que testa uma unidade de código
// 2. Uma unidade de código é uma função, um método, uma classe, um componente, etc
// 3. Um teste unitário não deve depender de nada externo
// 4. Um teste unitário deve ser rápido
// 5. Um teste unitário deve ser isolado e nunca bater em um banco de dados, API, etc

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example3.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)

    console.log(user.password_hash)
  })
})
