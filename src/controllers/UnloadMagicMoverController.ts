import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicItemOnMissionRepository from "../repositories/MagicItemOnMissionRepository"
import LoggerModule from "../modules/LoggerModule"
import APIError from "../classes/errors/APIError"

type TRequestBody = {
  itemOnMissionId: string
}

class UnloadMagicMoverController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { itemOnMissionId } = req.body as TRequestBody

      res.json(await this.logic(id, itemOnMissionId))
    } catch (err) {
      if (err instanceof APIError) {
        res.status(err.statusCode).send(err.message)
      } else {
        res.status(500).send('INTERNAL_ERROR')
        LoggerModule.error(err)
      }
    }
  }

  static async logic (moverId: string, itemOnMissionId: string) {
    const mover = await MagicMoverRepository.getById(moverId)

    if (!mover || !mover.id) throw new APIError('MAGIC_MOVER_NOT_FOUND', 404)

    if (mover.questState !== `LOADING`) throw new APIError(`MAGIC_MOVER_IS_NOT_LOADING`, 400)

    const itemOnMission =  await MagicItemOnMissionRepository.getById(itemOnMissionId)

    if (!itemOnMission || !itemOnMission.id) throw new APIError('MAGIC_ITEM_ON_MISSION_NOT_FOUND', 404)

    if (itemOnMission.mission?.startedAt) throw new APIError('MISSION_HAS_ALREADY_STARTED', 400)

    if (!await MagicItemOnMissionRepository.deleteById(itemOnMission.id)) throw new APIError(`FAILED_TO_REMOVE_ITEM`)

    return { success: true }
  }
}

export default UnloadMagicMoverController