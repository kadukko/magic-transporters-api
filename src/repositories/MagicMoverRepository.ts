import prismaClient from "../database/prismaClient"
import MagicMover, { TMagicMover } from "../entities/MagicMover"

const MagicMoverRepository = {
  async getAll() {
    const docs = await prismaClient.magicMover.findMany({
      include: {
        _count: true,
      }
    })

    return docs.map(doc => new MagicMover(doc as TMagicMover))
  },

  async getById(id:string) {
    const doc = await prismaClient.magicMover.findFirst({
      where: {
        id
      },
      include: {
        _count: true
      }
    })

    return new MagicMover(doc as TMagicMover)
  },

  async save(mover: MagicMover) {
    if (mover.id) {
      const doc = await prismaClient.magicMover.update({
        where: {
          id: mover.id
        },
        data: {
          weightLimit: mover.weightLimit,
          energy: mover.energy,
          questState: mover.questState
        }
      })
      
      return new MagicMover(doc as TMagicMover)
    } else {
      const doc = await prismaClient.magicMover.create({
        data: {
          weightLimit: mover.weightLimit,
          energy: mover.energy,
          questState: mover.questState
        }
      })
      
      return new MagicMover(doc as TMagicMover)
    }
  }
}

export default MagicMoverRepository