type Cataas = {
  tags: string[]
  mimetype: string
  size: number
  _id: string
}

class CataasService {
  private readonly apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async fetchCatData(): Promise<Cataas> {
    const response = await fetch(this.apiUrl)

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do Cataas')
    }
    return response.json()
  }

  buildCatImageUrl(id: string): string {
    return `https://cataas.com/cat/${id}`
  }
}

export default CataasService
