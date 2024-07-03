import type { Request, Response } from "express"
import MagicMover, { TMagicMover } from "../entities/MagicMover"
import MagicMoverRepository from "../repositories/MagicMoverRepository"

type TRequestBody = Omit<TMagicMover, 'id'>

class CreateMagicMoverController {
  static async handler (req: Request, res: Response) {
    const body = req.body as TRequestBody
    const mover = new MagicMover(body)
    await MagicMoverRepository.save(mover)
  }
}

export default CreateMagicMoverController