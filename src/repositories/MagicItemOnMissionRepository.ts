import prismaClient from "../database/prismaClient"
import MagicItemOnMission, { TMagicItemOnMission } from "../entities/MagicItemOnMission"

const MagicItemOnMissionRepository = {
  async getById (id: string) {
    const doc = await prismaClient.magicItemsOnMission.findFirst({
      where: {
        id
      },
      include: {
        mission: true
      }
    })

    return new MagicItemOnMission(doc as TMagicItemOnMission)
  },

  async deleteById (id: string) {
    const doc = await prismaClient.magicItemsOnMission.delete({
      where: { id }
    })

    return Boolean(doc)
  },

  async save(item: MagicItemOnMission) {
    if (item.id) {
      const doc = await prismaClient.magicItemsOnMission.update({
        where: {
          id: item.id
        },
        data: {
          itemId: item.itemId,
          missionId: item.missionId
        }
      })

      return new MagicItemOnMission(doc as TMagicItemOnMission)
    } else {
      const doc = await prismaClient.magicItemsOnMission.create({
        data: {
          itemId: item.itemId,
          missionId: item.missionId,
        }
      })

      return new MagicItemOnMission(doc as TMagicItemOnMission)
    }
  }
}

export default MagicItemOnMissionRepository