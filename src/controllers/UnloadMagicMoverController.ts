import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicItemOnMissionRepository from "../repositories/MagicItemOnMissionRepository"
import LoggerModule from "../modules/LoggerModule"
import APIError from "../classes/errors/APIError"
import MagicMissionRepository from "../repositories/MagicMissionRepository"

type TRequestBody = {
  itemId: string
}

class UnloadMagicMoverController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { itemId } = req.body as TRequestBody

      res.json(await UnloadMagicMoverController.logic(id, itemId))
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

    if (mover.questState !== `LOADING`) throw new APIError(`MAGIC_MOVER_IS_NOT_LOADING`, 400)

    const mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

    if (!mission || !mission.id) throw new APIError('MISSION_NOT_FOUND', 404)

    if (mission.startedAt) throw new APIError('MISSION_HAS_ALREADY_STARTED', 400)

    const itemOnMission = mission.items?.find(itemOnMission => itemOnMission.item.id === itemId)

    if (!itemOnMission || !itemOnMission.id) throw new APIError('MAGIC_ITEM_ON_MISSION_NOT_FOUND', 404)

    if (!await MagicItemOnMissionRepository.deleteById(itemOnMission.id)) throw new APIError(`FAILED_TO_REMOVE_ITEM`)

    return { success: true }
  }
}

export default UnloadMagicMoverController