import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicItemRepository from '../repositories/MagicItemRepository';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import MagicItemOnMissionRepository from '../repositories/MagicItemOnMissionRepository';
import StartMagicMoverMissionController from './StartMagicMoverMissionController';

describe('Start Magic Mover Mission', () => {
  test('Successful', async () => {
    let mover = await MagicMoverRepository.save({
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

    await StartMagicMoverMissionController.logic(mover.id)

    mission = await MagicMissionRepository.getById(mission.id)
    mover = await MagicMoverRepository.getById(mover.id)
    
    expect(mission.startedAt).toBeDefined()
    expect(mover.questState).toBe('ON_A_MISSION')

    await prismaClient.magicItemsOnMission.delete({ where: { id: itemOnMission.id }})
    await prismaClient.magicMission.delete({ where: { id: mission.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
    await prismaClient.magicItem.delete({ where: { id: item.id }})
  });
});