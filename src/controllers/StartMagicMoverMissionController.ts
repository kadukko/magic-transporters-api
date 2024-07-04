import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import LoggerModule from "../modules/LoggerModule"
import APIError from "../classes/errors/APIError"

class StartMagicMoverMissionController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params

      res.json(await StartMagicMoverMissionController.logic(id))
    } catch (err) {
      if (err instanceof APIError) {
        res.status(err.statusCode).send(err.message)
      } else {
        res.status(500).send('INTERNAL_ERROR')
        LoggerModule.error(err)
      }
    }
  }

  static async logic(moverId: string) {
    const mover = await MagicMoverRepository.getById(moverId)

    if (!mover || !mover.id) throw new APIError('MAGIC_MOVER_NOT_FOUND', 404)

    if (mover.questState !== 'LOADING') throw new APIError('MAGIC_MOVER_IS_NOT_LOADING', 400)

    const mission = await MagicMissionRepository.getLastMissionByMoverId(moverId)

    if (!mission || !mission.id) throw new APIError('MISSION_NOT_FOUND', 404)

    if (mission.startedAt) throw new APIError('MISSION_HAS_ALREADY_STARTED', 400)

    mission.startedAt = new Date()

    await MagicMissionRepository.save(mission)

    mover.questState = 'ON_A_MISSION'

    await MagicMoverRepository.save(mover)

    return { success: true }
  }
}

export default StartMagicMoverMissionController