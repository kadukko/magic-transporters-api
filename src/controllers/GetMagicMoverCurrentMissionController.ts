import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import LoggerModule from "../modules/LoggerModule"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import MagicMission from "../entities/MagicMission"
import APIError from "../classes/errors/APIError"

class GetMagicMoverCurrentMissionController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params
      res.json(await GetMagicMoverCurrentMissionController.logic(id))
    } catch (err) {
      if (err instanceof APIError) {
        res.status(err.statusCode).send(err.message)
      } else {
        res.status(500).send('INTERNAL_ERROR')
        LoggerModule.error(err)
      }
    }
  }

  static async logic (moverId: string) {
    const mover = await MagicMoverRepository.getById(moverId)

    if (!mover || !mover.id) throw new APIError('MAGIC_MOVER_NOT_FOUND', 404)

    if (['RESTING', 'DONE'].includes(mover.questState)) throw new APIError('MISSION_NOT_FOUND', 404)

    const mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

    return redactMission(mission)
  }
}

const redactMission = (mission: MagicMission | null) => {
  if (!mission) return null

  return {
    ...mission,
    items: mission.items?.map(item => ({
      ...item,
      missionId: undefined,
      itemId: undefined
    }))
  }
}

export default GetMagicMoverCurrentMissionController