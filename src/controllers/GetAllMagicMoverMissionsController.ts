import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import LoggerModule from "../modules/LoggerModule"
import MagicMissionRepository from "../repositories/MagicMissionRepository"
import MagicItemOnMission from "../entities/MagicItemOnMission"
import MagicMission from "../entities/MagicMission"

class GetAllMagicMoverMissionsController {
  static async handler (req: Request, res: Response) {
    try {
      const { id } = req.params

      const mover = await MagicMoverRepository.getById(id)

      if (!mover || !mover.id) return res.status(404).send('MAGIC_MOVER_NOT_FOUND')

      const missions = await MagicMissionRepository.getAllByMoverId(mover.id)

      res.json(missions.map(redactMission))
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }
}

const redactMission = (mission: MagicMission) => {
  return {
    ...mission,
    items: mission.items?.map(item => ({
      ...item,
      missionId: undefined,
      itemId: undefined
    }))
  }
}

export default GetAllMagicMoverMissionsController