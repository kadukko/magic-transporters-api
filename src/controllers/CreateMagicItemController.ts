import type { Request, Response } from "express"
import MagicItem, { TMagicItem } from "../entities/MagicItem"
import MagicItemRepository from "../repositories/MagicItemRepository"
import LoggerModule from "../modules/LoggerModule"

type TRequestBody = Omit<TMagicItem, 'id'>

class CreateMagicItemController {
  static async handler (req: Request, res: Response) {
    try {
      const body = req.body as TRequestBody
      const item = new MagicItem(body)
      res.json(await MagicItemRepository.save(item))
    } catch (err) {
      res.status(500).send('INTERNAL_ERROR')
      LoggerModule.error(err)
    }
  }
}

export default CreateMagicItemController