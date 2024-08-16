import { BlocksList } from '../components';
import { getBlockNumber } from '../data/blocks';

export default async function Homepage() {
  const blockNumber = await getBlockNumber();

  return <BlocksList blockNumber={blockNumber} />;
}
