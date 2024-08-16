import { getAlchemyInstance } from '@/lib/alchemy';

const alchemy = getAlchemyInstance();

export interface Nft {
  name: string | undefined;
}

export async function getNfts(address: string): Promise<Nft[]> {
  const { ownedNfts } = await alchemy.nft.getNftsForOwner(address);

  console.log(address);
  console.log(ownedNfts);

  return ownedNfts.map((o) => {
    return {
      name: o.name,
    };
  });
}
