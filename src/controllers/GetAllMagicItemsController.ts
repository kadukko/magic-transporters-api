import type { Request, Response } from "express"
import MagicItemRepository from "../repositories/MagicItemRepository"
import LoggerModule from "../modules/LoggerModule"

class GetAllMagicItemsController {
  static async handler (req: Request, res: Response) {
    try {
      res.json(await this.logic())
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }

  static async logic () {
    return await MagicItemRepository.getAll()
  }
}

export default GetAllMagicItemsController