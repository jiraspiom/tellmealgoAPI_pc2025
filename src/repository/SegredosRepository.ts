import { prisma } from '../lib/db.js'

type Segredo = {
  id?: string
  segredo?: string | null
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

  async createLike(id: string): Promise<Segredo | null> {
    const segredo = await prisma.segredos.findUnique({
      where: { id },
      select: { coracao: true },
    })

    if (!segredo) return null

    const like = (segredo.coracao ?? 0) + 1

    return prisma.segredos.update({
      where: { id: id },
      data: { coracao: like },
    })
  }
}

export default SegredosRepository
