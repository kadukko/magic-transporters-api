import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMission from "../entities/MagicMission"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import MagicItemOnMission from "../entities/MagicItemOnMission"
import MagicItem from "../entities/MagicItem"
import MagicItemRepository from "../repositories/MagicItemRepository"
import MagicItemOnMissionRepository from "../repositories/MagicItemOnMissionRepository"

type TRequestBody = {
  itemId: string
}

class LoadMatchMoverController {
  static async handler (req: Request, res: Response) {
    const { id } = req.params
    const { itemId } = req.body as TRequestBody

    const mover = await MagicMoverRepository.getById(id)

    if (!mover || !mover.id) return res.status(404).send('MAGIC_MOVER_NOT_FOUND')

    const item = await MagicItemRepository.getById(itemId)

    if (!item || !item.id) return res.status(404).send('MAGIC_ITEM_NOT_FOUND')

    if (mover.energy < item.weight) return res.status(400).send('TOO_HEAVY_ITEM')

    let mission = null
    let itemOnMission = null

    if (['ON_A_MISSION', 'DONE'].includes(mover.questState)) return res.status(400).send('NOT_ALLOWED')

    if (mover.questState === 'LOADING') {
      mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

      if (!mission || !mission.id) return res.status(404).send('MAGIC_MISSION_NOT_FOUND')

      let totalWeight = mission.items?.reduce((prev, next) => prev + next.item.weight, 0) || 0

      if (mover.weightLimit < totalWeight) return res.status(400).send('WEIGHT_LIMIT_EXCEEDED')

      itemOnMission = new MagicItemOnMission({
        itemId: item.id,
        missionId: mission.id,
        createdAt: new Date()
      })
    }
    
    if (mover.questState === 'RESTING') {
      mission = await MagicMissionRepository.save(new MagicMission({
        moverId: mover.id,
        createdAt: new Date()
      }))

      if (!mission || !mission.id) return res.status(404).send('MAGIC_MISSION_NOT_FOUND')

      if (mover.weightLimit < item.weight) return res.status(400).send('WEIGHT_LIMIT_EXCEEDED')

      itemOnMission = new MagicItemOnMission({
        itemId: item.id,
        missionId: mission.id,
        createdAt: new Date()
      })

      mover.questState = 'LOADING'
    } 

    if (!itemOnMission) return res.status(500).send('FAILED_TO_LOAD')

    await MagicItemOnMissionRepository.save(itemOnMission)
    
    if (!mission) return res.status(404).send('MAGIC_MISSION_NOT_FOUND')
      
    await MagicMissionRepository.save(mission)

    res.json({ success: true })
  }
}

export default LoadMatchMoverController