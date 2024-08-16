import { TransactionResponse, Utils } from 'alchemy-sdk';
import { getAlchemyInstance } from '../lib/alchemy';

const alchemy = getAlchemyInstance();

export interface Block {
  hash: string;
  number: number;
  transactions: TransactionResponse[];
  value: number;
  date: string;
}

export async function getBlockNumber() {
  return await alchemy.core.getBlockNumber();
}

export async function getBlock(numberRequested: number): Promise<Block> {
  const { hash, number, transactions, timestamp } =
    await alchemy.core.getBlockWithTransactions(numberRequested);

  let value = transactions.reduce((acc, index) => {
    return acc + Number(index.value);
  }, 0);
  value = Number(Number(Utils.formatEther(value.toString())).toFixed(2));

  const date = new Date(timestamp * 1000).toLocaleDateString();
  const time = new Date(timestamp * 1000).toLocaleTimeString();

  return {
    hash,
    number,
    transactions,
    value,
    date: `${date} ${time}`,
  };
}

export async function getBlocks(cursor?: number): Promise<Block[]> {
  if (!cursor) {
    cursor = await getBlockNumber();
  }

  const LIMIT = 4;
  let promises = [];
  for (let i = cursor; i >= cursor - LIMIT; i--) {
    if (i < 1) continue;

    promises.push(alchemy.core.getBlockWithTransactions(i));
  }

  const blocks = await Promise.all(promises);

  return blocks.map(({ number, hash, transactions, timestamp }) => {
    let value = transactions.reduce((acc, index) => {
      return acc + Number(index.value);
    }, 0);
    value = Number(Number(Utils.formatEther(value.toString())).toFixed(2));

    const date = new Date(timestamp * 1000).toLocaleDateString();
    const time = new Date(timestamp * 1000).toLocaleTimeString();

    return {
      number,
      hash,
      transactions,
      value,
      date: `${date} ${time}`,
    };
  });
}
