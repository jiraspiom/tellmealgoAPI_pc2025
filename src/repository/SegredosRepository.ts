import { prisma } from '../lib/db.js'

type Segredo = {
  id?: string
  segredo: string
  cor?: string | null
  coracao?: number | null
  urlImage?: string | null
}

class SegredosRepository {
  async getAllSegredos(take: number): Promise<Segredo[]> {
    return prisma.segredos.findMany({
      take,
      orderBy: { dataAt: 'desc' },
    })
  }

  async getSegredoById(id: string): Promise<Segredo | null> {
    return prisma.segredos.findUnique({ where: { id } })
  }

  async createSegredo(segredo: Segredo): Promise<Segredo> {
    return prisma.segredos.create({ data: segredo })
  }
}

export default SegredosRepository
