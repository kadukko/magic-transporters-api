import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicMissionRepository from "../repositories/MagicMissionRepository"

class EndMatchMoverMissionController {
  static async handler (req: Request, res: Response) {
    const { id } = req.params

    const mover = await MagicMoverRepository.getById(id)

    if (!mover || !mover.id) return res.status(404).send('MAGIC_MOVER_NOT_FOUND')

    if (mover.questState !== 'ON_A_MISSION') return res.status(400).send('MAGIC_MOVER_IS_NOT_ON_MISSION')

    const mission = await MagicMissionRepository.getLastMissionByMoverId(id)

    if (!mission || !mission.id) return res.status(404).send('MISSION_NOT_FOUND')

    if (!mission.startedAt) return res.status(500).send('MISSION_IS_NOT_STARTED')
    
    if (mission.endedAt) return res.status(500).send('MISSION_HAS_ALREADY_ENDED')

    mission.endedAt = new Date()

    await MagicMissionRepository.save(mission)

    mover.questState = 'DONE'

    await MagicMoverRepository.save(mover)

    res.json({ success: true })
  }
}

export default EndMatchMoverMissionController