export type TMagicItem = {
  id?: string
  name: string
  weight: number
}

class MagicItem {
  id?: string
  name: string
  weight: number

  constructor (data: TMagicItem) {
    this.id = data.id
    this.name = data.name
    this.weight = data.weight
  }
}

export default MagicItem