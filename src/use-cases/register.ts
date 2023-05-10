import { UsersRepository } from '@/repositories/user-repository'
// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

/**
 * SOLID Principles
 * S - Single Responsibility Principle
 * O - Open Closed Principle
 * L - Liskov Substitution Principle
 * I - Interface Segregation Principle
 * D - Dependency Inversion Principle <-- This one
 */

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

/**
 * The code below is the same as the code above, but it's not using the SOLID Principles
 * It's tottaly dependent of the PrismaUsersRepository
 */
// export async function registerUseCase({
//   name,
//   email,
//   password,
// }: RegisterUseCaseRequest) {
//   const password_hash = await hash(password, 6)

//   const userWithSameEmail = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   })

//   if (userWithSameEmail) {
//     throw new Error('User already exists')
//   }

//   const prismaUsersRepository = new PrismaUsersRepository()

//   await prismaUsersRepository.create({
//     name,
//     email,
//     password_hash,
//   })
// }
