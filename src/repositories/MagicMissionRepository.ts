import prismaClient from "../database/prismaClient"
import MagicMission, { TMagicMission } from "../entities/MagicMission"

const MagicMissionRepository = {
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
    
    return doc && new MagicMission(doc as TMagicMission)
  },

  
  async getAllByMoverId(moverId: string) {
    const docs = await prismaClient.magicMission.findMany({
      where: {
        moverId 
      },
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    })

    return docs.map(doc => new MagicMission(doc as TMagicMission))
  },

  async getLastMissionByMoverId (moverId: string) {
    const doc = await prismaClient.magicMission.findFirst({
      where: {
        moverId: moverId
      },
      include: {
        items: {
          include: {
            item: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    return doc && new MagicMission(doc as TMagicMission)
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

      return doc && new MagicMission(doc as TMagicMission)
    } else {
      const doc = await prismaClient.magicMission.create({
        data: {
          moverId: mission.moverId,
          startedAt: mission.startedAt,
          endedAt: mission.endedAt,
          createdAt: mission.createdAt
        }
      })

      return doc &&new MagicMission(doc as TMagicMission)
    }

    return null
  }
}

export default MagicMissionRepository