import { Prisma } from '@prisma/client'

export class InMemoryRepository {
  public users: any[] = []

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
