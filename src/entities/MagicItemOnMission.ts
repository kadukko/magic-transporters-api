import MagicMission from "./MagicMission"

export type TMagicItemOnMission = {
  id?: string
  missionId: string
  mission?: MagicMission
  itemId: string
  createdAt: Date
}

class MagicItemOnMission {
  id?: string
  missionId: string
  mission?: MagicMission
  itemId: string
  createdAt: Date

  constructor (data: TMagicItemOnMission) {
    this.id = data.id
    this.missionId = data.missionId
    this.itemId = data.itemId
    this.mission = data.mission && new MagicMission(data.mission)
    this.createdAt = data.createdAt
  }
}

export default MagicItemOnMission