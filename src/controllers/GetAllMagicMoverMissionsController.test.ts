import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicMoverRepository from '../repositories/MagicMoverRepository';
import MagicMissionRepository from '../repositories/MagicMissionRepository';
import GetAllMagicMoverMissionsController from './GetAllMagicMoverMissionsController';

describe('Get All Magic Mover Missions', () => {
  test('Successful', async () => {
    const mover = await MagicMoverRepository.save({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100,
      questState: 'RESTING'
    })

    if (!mover || !mover.id) throw new Error('FAIL')

    const mission1 = await MagicMissionRepository.save({
      moverId: mover.id,
      createdAt: new Date()
    })

    if (!mission1 || !mission1.id) throw new Error('FAIL')

    const mission2 = await MagicMissionRepository.save({
      moverId: mover.id,
      createdAt: new Date()
    })

    if (!mission2 || !mission2.id) throw new Error('FAIL')

    const missions = await GetAllMagicMoverMissionsController.logic(mover.id)
    
    expect(missions.find(mission => mission.id === mission1.id)).toBeDefined()
    expect(missions.find(mission => mission.id === mission2.id)).toBeDefined()

    await prismaClient.magicMission.delete({ where: { id: mission1.id }})
    await prismaClient.magicMission.delete({ where: { id: mission2.id }})
    await prismaClient.magicMover.delete({ where: { id: mover.id }})
  });
});