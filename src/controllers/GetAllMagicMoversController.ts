import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import LoggerModule from "../modules/LoggerModule"
import MagicMover from "../entities/MagicMover"

class GetAllMagicMoversController {
  static async handler (req: Request, res: Response) {
    try {
      res.json(await GetAllMagicMoversController.logic())
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }

  static async logic () {
    const movers = await MagicMoverRepository.getAll()
      .then(movers => movers.map(redactMagicMover))
      .then(movers => movers.sort((a, b) => b.totalMissions - a.totalMissions))

    return movers
  }
}

const redactMagicMover = (mover: MagicMover) => {
  const totalMissions = mover.missions?.filter(mission => mission.endedAt).length

  return {
    ...mover,
    missions: undefined,
    totalMissions: totalMissions || 0
  }
}

export default GetAllMagicMoversController