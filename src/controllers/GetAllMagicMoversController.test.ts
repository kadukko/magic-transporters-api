import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import GetAllMagicMoversController from './GetAllMagicMoversController';

describe('Get All Magic Movers', () => {
  test('Successful', async () => {
    const mover1 = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'RESTING'
    })

    if (!mover1 || !mover1.id) throw new Error('FAIL')

    const mover2 = await MagicMoverRepository.save({
      name: 'Pedro',
      energy: 30,
      weightLimit: 100,
      questState: 'RESTING'
    })

    if (!mover2 || !mover2.id) throw new Error('FAIL')

    const movers = await GetAllMagicMoversController.logic()
    
    expect(movers.find(mover => mover.id === mover1.id)).toBeDefined()
    expect(movers.find(mover => mover.id === mover2.id)).toBeDefined()

    await prismaClient.magicMover.delete({ where: { id: mover1.id }})
    await prismaClient.magicMover.delete({ where: { id: mover2.id }})
  });
});