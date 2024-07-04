import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import LoggerModule from "../modules/LoggerModule"
import APIError from "../classes/errors/APIError"

class EndMagicMoverMissionController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params
      res.json(await EndMagicMoverMissionController.logic(id))
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

    if (mover.questState !== 'ON_A_MISSION') throw new APIError('MAGIC_MOVER_IS_NOT_ON_MISSION', 400)

    const mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

    if (!mission || !mission.id) throw new APIError('MISSION_NOT_FOUND', 404)

    if (!mission.startedAt) throw new APIError('MISSION_IS_NOT_STARTED', 400)
    
    if (mission.endedAt) throw new APIError('MISSION_HAS_ALREADY_ENDED', 400)

    mission.endedAt = new Date()

    await MagicMissionRepository.save(mission)

    mover.questState = 'DONE'

    await MagicMoverRepository.save(mover)

    return { success: true }
  }
}

export default EndMagicMoverMissionController