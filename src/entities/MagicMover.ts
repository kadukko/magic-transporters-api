export type TMagicMover = {
  id?: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE',
  _count?: TMagicMoverCounter
}

type TMagicMoverCounter = {
  missions: number
}

class MagicMover {
  id?: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE'
  _count?: TMagicMoverCounter

  constructor (data: TMagicMover) {
    this.id = data.id
    this.weightLimit = data.weightLimit
    this.energy = data.energy
    this.questState = data.questState
    this._count = data._count
  }
}

export default MagicMover