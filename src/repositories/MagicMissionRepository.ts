import prismaClient from "../database/prismaClient"
import MagicMission, { TMagicMission } from "../entities/MagicMission"

const MagicMissionRepository = {
  async getAll() {
    const docs = await prismaClient.magicMission.findMany()
    return docs.map(doc => new MagicMission(doc as TMagicMission))
  },

  async getById(id:string) {
    const doc = await prismaClient.magicMission.findFirst({
      where: {
        id
      },
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    })
    
    return new MagicMission(doc as TMagicMission)
  },

  async getLastMissionByMoverId (moverId: string) {
    const doc = await prismaClient.magicMission.findFirst({
      where: {
        moverId: moverId
      },
      orderBy: {
        id: 'desc'
      }
    })

    return new MagicMission(doc as TMagicMission)
  },

  async save(mission: MagicMission) {
    if (mission.id) {
      const doc = await prismaClient.magicMission.update({
        where: {
          id: mission.id
        },
        data: {
          moverId: mission.moverId,
          startedAt: mission.startedAt,
          endedAt: mission.endedAt,
          createdAt: mission.createdAt
        },
      })

      return new MagicMission(doc as TMagicMission)
    } else {
      const doc = await prismaClient.magicMission.create({
        data: {
          moverId: mission.moverId,
          startedAt: mission.startedAt,
          endedAt: mission.endedAt,
          createdAt: mission.createdAt
        }
      })

      return new MagicMission(doc as TMagicMission)
    }
  }
}

export default MagicMissionRepository