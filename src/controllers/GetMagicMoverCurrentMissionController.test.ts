import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicItemRepository from '../repositories/MagicItemRepository';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import MagicItemOnMissionRepository from '../repositories/MagicItemOnMissionRepository';
import GetMagicMoverCurrentMissionController from './GetMagicMoverCurrentMissionController';

describe('Get Magic Mover Current Mission', () => {
  test('Successful', async () => {
    const mover = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'ON_A_MISSION'
    })

    if (!mover || !mover.id) throw new Error('FAIL')

    const item = await MagicItemRepository.save({
      name: 'Magic staff',
      weight: 30
    })

    if (!item || !item.id) throw new Error('FAIL')

    const mission = await MagicMissionRepository.save({
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

    const currentMission = await GetMagicMoverCurrentMissionController.logic(mover.id)
    
    expect(currentMission).toBeDefined()
    expect(currentMission.id === mission.id).toBe(true)

    await prismaClient.magicItemsOnMission.delete({ where: { id: itemOnMission.id }})
    await prismaClient.magicMission.delete({ where: { id: mission.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
    await prismaClient.magicItem.delete({ where: { id: item.id }})
  });
});