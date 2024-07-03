import prismaClient from "../database/prismaClient"
import MagicMover, { TMagicMover } from "../entities/MagicMover"

const MagicMoverRepository = {
  async getAll() {
    const docs = await prismaClient.magicMover.findMany()
    return docs.map(doc => new MagicMover(doc as TMagicMover))
  },

  async getById(id:string) {
    const doc = await prismaClient.magicMover.findFirst({where: {id}})
    return new MagicMover(doc as TMagicMover)
  },

  async save(mover: MagicMover) {
    if (mover.id) {
      await prismaClient.magicMover.update({
        where: {
          id: mover.id
        },
        data: {
          weightLimit: mover.weightLimit,
          energy: mover.energy,
          questState: mover.questState
        }
      })
    } else {
      await prismaClient.magicMover.create({
        data: {
          weightLimit: mover.weightLimit,
          energy: mover.energy,
          questState: mover.questState
        }
      })
    }
  }
}

export default MagicMoverRepository