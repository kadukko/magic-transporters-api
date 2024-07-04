import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicItemRepository from '../repositories/MagicItemRepository';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import LoadMagicMoverController from './LoadMagicMoverController';

describe('Load Magic Mover', () => {
  test('Successful', async () => {
    const mover = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'RESTING'
    })

    if (!mover || !mover.id) throw new Error('FAIL')

    const item = await MagicItemRepository.save({
      name: 'Magic staff',
      weight: 30
    })

    if (!item || !item.id) throw new Error('FAIL')

    await LoadMagicMoverController.logic(mover.id, item.id)

    const mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

    if (!mission || !mission.id || !mission.items) throw new Error('FAIL')
    
    expect(mission).toBeDefined()
    expect(mission.items[0].itemId === item.id).toBe(true)

    await prismaClient.magicItemsOnMission.delete({ where: { id: mission.items[0].id }})
    await prismaClient.magicMission.delete({ where: { id: mission.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
    await prismaClient.magicItem.delete({ where: { id: item.id }})
  });
});