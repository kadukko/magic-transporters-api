import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"

class GetAllMagicMoversController {
  static async handler (req: Request, res: Response) {
    const movers = await MagicMoverRepository.getAll()
    res.json(movers)
  }
}

export default GetAllMagicMoversController