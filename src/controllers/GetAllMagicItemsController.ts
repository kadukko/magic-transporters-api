import type { Request, Response } from "express"
import MagicItemRepository from "../repositories/MagicItemRepository"
import LoggerModule from "../modules/LoggerModule"

class GetAllMagicItemsController {
  static async handler (req: Request, res: Response) {
    try {
      const items = await MagicItemRepository.getAll()
      res.json(items)
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }
}

export default GetAllMagicItemsController