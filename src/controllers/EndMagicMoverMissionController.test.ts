import {describe, expect, test} from '@jest/globals';
import MagicItemRepository from '../repositories/MagicItemRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicItemOnMissionRepository from '../repositories/MagicItemOnMissionRepository';
import EndMagicMoverMissionController from './EndMagicMoverMissionController';
import prismaClient from '../database/prismaClient';

describe('End Magic Mover Mission', () => {
  test('Successful', async () => {
    let mover = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'ON_A_MISSION'
    })

    if (!mover || !mover.id) throw new Error('FAIL')

    const item = await MagicItemRepository.save({
      name: 'Magic book',
      weight: 10
    })

    if (!item || !item.id) throw new Error('FAIL')

    let mission = await MagicMissionRepository.save({
      moverId: mover.id,
      startedAt: new Date(),
      createdAt: new Date()
    })

    if (!mission || !mission.id) throw new Error('FAIL')

    const itemOnMission = await MagicItemOnMissionRepository.save({
      missionId: mission.id,
      itemId: item.id,
      createdAt: new Date()
    })

    await EndMagicMoverMissionController.logic(mover.id)

    mission = await MagicMissionRepository.getById(mission.id)
    mover = await MagicMoverRepository.getById(mover.id)

    expect(mission.endedAt).toBeDefined()
    expect(mover.questState).toBe('RESTING')

    await prismaClient.magicItemsOnMission.delete({ where: { id: itemOnMission.id }})
    await prismaClient.magicMission.delete({ where: { id: mission.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
    await prismaClient.magicItem.delete({ where: { id: item.id }})
  });
});