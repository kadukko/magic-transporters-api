import {describe, expect, test} from '@jest/globals';
import prismaClient from '../database/prismaClient';
import MagicItemRepository from '../repositories/MagicItemRepository';
import GetAllMagicItemsController from './GetAllMagicItemsController';

describe('Get All Magic Items', () => {
  test('Successful', async () => {
    const magicItem = await MagicItemRepository.save({
      name: 'Magic staff',
      weight: 30
    })

    if (!magicItem || !magicItem.id) throw new Error('FAIL')

    const items = await GetAllMagicItemsController.logic()
    
    expect(items.find(item => item.id === magicItem.id)).toBeDefined()

    await prismaClient.magicItem.delete({ where: { id: magicItem.id }})
  });
});