import type { Request, Response } from "express"
import MagicMover, { TMagicMover } from "../entities/MagicMover"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import LoggerModule from "../modules/LoggerModule"

type TRequestBody = Omit<TMagicMover, 'id' | '_count' | 'questState'>

class CreateMagicMoverController {
  static async handler (req: Request, res: Response) {
    try {
      const body = req.body as TRequestBody
      const mover = new MagicMover({...body, questState: 'RESTING'})
      res.json(await MagicMoverRepository.save(mover))
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }
}

export default CreateMagicMoverController