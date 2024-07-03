export type TMagicMover = {
  id?: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE'
}

class MagicMover {
  id?: string
  weightLimit: number
  energy: number
  questState: 'RESTING' | 'LOADING' | 'ON_A_MISSION' | 'DONE'

  constructor (data: TMagicMover) {
    this.id = data.id
    this.weightLimit = data.weightLimit
    this.energy = data.energy
    this.questState = data.questState
  }
}

export default MagicMover