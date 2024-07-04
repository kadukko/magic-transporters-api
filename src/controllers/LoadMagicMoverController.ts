import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMission from "../entities/MagicMission"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import MagicItemOnMission from "../entities/MagicItemOnMission"
import MagicItemRepository from "../repositories/MagicItemRepository"
import MagicItemOnMissionRepository from "../repositories/MagicItemOnMissionRepository"
import LoggerModule from "../modules/LoggerModule"
import APIError from "../classes/errors/APIError"

type TRequestBody = {
  itemId: string
}

class LoadMagicMoverController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { itemId } = req.body as TRequestBody

      res.json(await LoadMagicMoverController.logic(id, itemId))
    } catch (err) {
      if (err instanceof APIError) {
        res.status(err.statusCode).send(err.message)
      } else {
        res.status(500).send('INTERNAL_ERROR')
        LoggerModule.error(err)
      }
    }
  }

  static async logic (moverId: string, itemId: string) {
    const mover = await MagicMoverRepository.getById(moverId)

    if (!mover || !mover.id) throw new APIError('MAGIC_MOVER_NOT_FOUND', 404)

    const item = await MagicItemRepository.getById(itemId)

    if (!item || !item.id) throw new APIError('MAGIC_ITEM_NOT_FOUND', 404)

    if (mover.energy < item.weight) throw new APIError('TOO_HEAVY_ITEM', 400)

    let mission = null
    let itemOnMission = null

    if (['ON_A_MISSION'].includes(mover.questState)) throw new APIError('MAGIC_MOVER_HAS_ALREADY_ON_MISSION', 400)

    if (mover.questState === 'LOADING') {
      mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

      if (!mission || !mission.id) throw new APIError('MAGIC_MISSION_NOT_FOUND', 404)

      let totalWeight = mission.items?.reduce((prev, next) => prev + next.item.weight, 0) || 0

      if (mover.weightLimit < totalWeight + item.weight) throw new APIError('WEIGHT_LIMIT_EXCEEDED', 400)

      itemOnMission = new MagicItemOnMission({
        itemId: item.id,
        missionId: mission.id,
        createdAt: new Date()
      })
    }
    
    if (['RESTING', 'DONE'].includes(mover.questState)) {
      mission = await MagicMissionRepository.save(new MagicMission({
        moverId: mover.id,
        createdAt: new Date()
      }))

      if (!mission || !mission.id) throw new APIError('MAGIC_MISSION_NOT_FOUND', 404)

      if (mover.weightLimit < item.weight) throw new APIError('WEIGHT_LIMIT_EXCEEDED', 400)

      itemOnMission = new MagicItemOnMission({
        itemId: item.id,
        missionId: mission.id,
        createdAt: new Date()
      })

      mover.questState = 'LOADING'
    } 
    
    if (!mission) throw new APIError('MAGIC_MISSION_NOT_FOUND', 404)
      
    await MagicMissionRepository.save(mission)

    if (!itemOnMission) throw new APIError('FAILED_TO_LOAD', 500)

    await MagicItemOnMissionRepository.save(itemOnMission)

    await MagicMoverRepository.save(mover)

    return { success: true }
  }
}

export default LoadMagicMoverController