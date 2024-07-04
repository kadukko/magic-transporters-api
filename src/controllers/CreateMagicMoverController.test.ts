import {describe, expect, test} from '@jest/globals';
import CreateMagicMoverController from './CreateMagicMoverController';
import prismaClient from '../database/prismaClient';

describe('Create Magic Mover', () => {
  test('Successful', async () => {
    const mover = await CreateMagicMoverController.logic({
      name: 'Ricardo',
      energy: 30,
      weightLimit: 100
    })

    expect(mover).toBeDefined()
    expect(mover.id).toBeDefined()

    prismaClient.magicMover.delete({
      where: {
        id: mover.id
      }
    })
  });
});