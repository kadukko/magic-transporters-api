import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import LoggerModule from "../modules/LoggerModule"

class StartMagicMoverMissionController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params

      const mover = await MagicMoverRepository.getById(id)

      if (!mover || !mover.id) return res.status(404).send('MAGIC_MOVER_NOT_FOUND')

      if (mover.questState !== 'LOADING') return res.status(400).send('MAGIC_MOVER_IS_NOT_LOADING')

      const mission = await MagicMissionRepository.getLastMissionByMoverId(id)

      if (!mission || !mission.id) return res.status(404).send('MISSION_NOT_FOUND')

      if (mission.startedAt) return res.status(400).send('MISSION_HAS_ALREADY_STARTED')

      mission.startedAt = new Date()

      await MagicMissionRepository.save(mission)

      mover.questState = 'ON_A_MISSION'

      await MagicMoverRepository.save(mover)

      res.json({ success: true })
      
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }
}

export default StartMagicMoverMissionController