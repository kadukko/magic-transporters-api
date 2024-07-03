import type { Request, Response } from "express"
import MagicItemRepository from "../repositories/MagicItemRepository"

class GetAllMagicItemsController {
  static async handler (req: Request, res: Response) {
    const items = await MagicItemRepository.getAll()
    res.json(items)
  }
}

export default GetAllMagicItemsController