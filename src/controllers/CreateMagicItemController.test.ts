import {describe, expect, test} from '@jest/globals';
import CreateMagicItemController from './CreateMagicItemController';
import prismaClient from '../database/prismaClient';

describe('Create Magic Item', () => {
  test('Successful', async () => {
    const item = await CreateMagicItemController.logic({
      name: 'item',
      weight: 10
    })

    expect(item).toBeDefined()
    expect(item.id).toBeDefined()

    prismaClient.magicItem.delete({
      where: {
        id: item.id
      }
    })
  });
});