import { getAlchemyInstance } from '@/lib/alchemy';

const alchemy = getAlchemyInstance();

export interface Token {
  name: string | null;
  balance: string | null;
}

export async function getTokens(address: string): Promise<Token[]> {
  const { tokenBalances } = await alchemy.core.getTokenBalances(address);

  let tokens = [];
  for (let i = 0; i < tokenBalances.length; i++) {
    const { contractAddress, tokenBalance } = tokenBalances[i];

    const token = await alchemy.core.getTokenMetadata(contractAddress);

    tokens.push({
      name: token.name,
      balance: tokenBalance,
    });
  }

  return tokens;
}
