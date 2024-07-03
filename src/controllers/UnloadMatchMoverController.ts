import type { Request, Response } from "express"
import MagicMoverRepository from "../repositories/MagicMoverRepository"
import MagicItemOnMissionRepository from "../repositories/MagicItemOnMissionRepository"

type TRequestBody = {
  itemOnMissionId: string
}

class UnloadMatchMoverController {
  static async handler (req: Request, res: Response) {
    const { id } = req.params
    const { itemOnMissionId } = req.body as TRequestBody

    const mover = await MagicMoverRepository.getById(id)

    if (!mover || !mover.id) return res.status(404).send('MAGIC_MOVER_NOT_FOUND')

    if (mover.questState !== `LOADING`) return res.status(400).send(`NOT_ALLOWED`)

    const itemOnMission =  await MagicItemOnMissionRepository.getById(itemOnMissionId)

    if (!itemOnMission || !itemOnMission.id) return res.status(404).send('MAGIC_ITEM_ON_MISSION_NOT_FOUND')

    if (itemOnMission.mission?.startedAt) return res.status(400).send('MAGIC_MISSION_HAS_ALREADY_STARTED')

    if (!await MagicItemOnMissionRepository.deleteById(itemOnMission.id)) return res.status(500).send(`FAILED_TO_REMOVE_ITEM`)

    res.json({ success: true })
  }
}

export default UnloadMatchMoverController