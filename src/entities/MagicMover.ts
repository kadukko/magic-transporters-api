import MagicMission, { TMagicMission } from "./MagicMission"

export type TMagicMover = {
  id?: string
  name: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE',
  missions?: TMagicMission[]
}

type TMagicMoverCounter = {
  missions: number
}

class MagicMover {
  id?: string
  name: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE'
  missions?: MagicMission[]

  constructor (data: TMagicMover) {
    this.id = data.id
    this.name = data.name
    this.weightLimit = data.weightLimit
    this.energy = data.energy
    this.questState = data.questState
    this.missions = data.missions?.map(mission => new MagicMission(mission))
  }
}

export default MagicMover