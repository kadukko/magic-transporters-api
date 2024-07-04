import type { Request, Response } from "express"
import MagicMover, { TMagicMover } from "../entities/MagicMover"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import LoggerModule from "../modules/LoggerModule"

type TRequestBody = Omit<TMagicMover, 'id' | '_count' | 'questState'>

class CreateMagicMoverController {
  static async handler (req: Request, res: Response) {
    try {
      const body = req.body as TRequestBody
      res.json(await CreateMagicMoverController.logic(body))
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }

  static async logic (moverInput: TRequestBody) {
    const mover = new MagicMover({...moverInput, questState: 'RESTING'})
    return await MagicMoverRepository.save(mover)
  }
}

export default CreateMagicMoverController