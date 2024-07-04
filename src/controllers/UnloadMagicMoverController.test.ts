import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicItemRepository from '../repositories/MagicItemRepository';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import MagicItemOnMissionRepository from '../repositories/MagicItemOnMissionRepository';
import GetMagicMoverCurrentMissionController from './GetMagicMoverCurrentMissionController';
import UnloadMagicMoverController from './UnloadMagicMoverController';

describe('Unload Magic Mover', () => {
  test('Successful', async () => {
    const mover = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'LOADING'
    })

    if (!mover || !mover.id) throw new Error('FAIL')

    const item = await MagicItemRepository.save({
      name: 'Magic staff',
      weight: 30
    })

    if (!item || !item.id) throw new Error('FAIL')

    let mission = await MagicMissionRepository.save({
      moverId: mover.id,
      createdAt: new Date()
    })

    if (!mission || !mission.id) throw new Error('FAIL')

    const itemOnMission = await MagicItemOnMissionRepository.save({
      missionId: mission.id,
      itemId: item.id,
      createdAt: new Date()
    })

    if (!itemOnMission || !itemOnMission.id) throw new Error('FAIL')

    await UnloadMagicMoverController.logic(mover.id, itemOnMission.id)

    mission = await MagicMissionRepository.getLastMissionByMoverId(mover.id)

    if (!mission || !mission.id || !mission.items) throw new Error('FAIL')
    
    expect(mission).toBeDefined()
    expect(mission.items.length).toBe(0)

    await prismaClient.magicMission.delete({ where: { id: mission.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
    await prismaClient.magicItem.delete({ where: { id: item.id }})
  });
});