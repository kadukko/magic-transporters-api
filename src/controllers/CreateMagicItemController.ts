import type { Request, Response } from "express"
import MagicItem, { TMagicItem } from "../entities/MagicItem"
import MagicItemRepository from "../repositories/MagicItemRepository"

type TRequestBody = Omit<TMagicItem, 'id'>

class CreateMagicItemController {
  static async handler (req: Request, res: Response) {
    const body = req.body as TRequestBody
    const item = new MagicItem(body)
    res.json(await MagicItemRepository.save(item))
  }
}

export default CreateMagicItemController