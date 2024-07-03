import prismaClient from "../database/prismaClient"
import MagicItem, { TMagicItem } from "../entities/MagicItem"

const MagicItemRepository = {
  async getAll() {
    const docs = await prismaClient.magicItem.findMany()
    return docs.map(doc => new MagicItem(doc as TMagicItem))
  },

  async getById(id:string) {
    const doc = await prismaClient.magicItem.findFirst({where: {id}})
    return new MagicItem(doc as TMagicItem)
  },

  async save(item: MagicItem) {
    if (item.id) {
      const doc = await prismaClient.magicItem.update({
        where: {
          id: item.id
        },
        data: {
          name: item.name,
          weight: item.weight
        }
      })
      
      return new MagicItem(doc as TMagicItem)
    } else {
      const doc = await prismaClient.magicItem.create({
        data: {
          name: item.name,
          weight: item.weight
        }
      })
      
      return new MagicItem(doc as TMagicItem)
    }
  }
}

export default MagicItemRepository