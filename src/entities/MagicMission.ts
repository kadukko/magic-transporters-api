import MagicItem, { TMagicItem } from "./MagicItem"

export type TMagicMission = {
  id?: string
  moverId: string
  items?: TMagicItemOnMission[]
  startedAt?: Date
  endedAt?: Date
  createdAt: Date
}

class MagicMission {
  id?: string
  moverId: string
  items?: MagicItemOnMission[]
  startedAt?: Date
  endedAt?: Date
  createdAt: Date

  constructor (data: TMagicMission) {
    this.id = data.id
    this.moverId = data.moverId
    this.startedAt = data.startedAt
    this.endedAt = data.endedAt
    this.createdAt = data.createdAt
    this.items = data.items?.map(item => new MagicItemOnMission(item))
  }
}

type TMagicItemOnMission = {
  id?: string
  itemId: string
  missionId: string
  item: TMagicItem
}

class MagicItemOnMission {
  id?: string
  itemId: string
  missionId: string
  item: MagicItem

  constructor(data: TMagicItemOnMission) {
    this.id = data.id
    this.itemId = data.itemId
    this.missionId = data.missionId
    this.item = new MagicItem(data.item)
  }
}

export default MagicMission