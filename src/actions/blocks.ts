'use server';

import { getBlockNumber } from '../data/blocks';

export async function getLastBlockNumber() {
  return await getBlockNumber();
}
