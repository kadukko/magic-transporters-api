import type { Request, Response } from "express"
import MagicItemRepository from "../repositories/MagicItemRepository"

class GetAllMagicItemsController {
  static async handler (req: Request, res: Response) {
    const movers = await MagicItemRepository.getAll()
    res.json(movers)
  }
}

export default GetAllMagicItemsController