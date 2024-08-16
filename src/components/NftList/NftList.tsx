'use client';

import { Token } from '@/data/tokens';
import { Card, Loader, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

export default function NftList() {
  const { address } = useWeb3ModalAccount();

  const { data: nfts, isLoading } = useQuery({
    queryKey: ['nft', address],
    queryFn: async () => {
      const response = await fetch('/api/' + address + '/nft');
      return response.json();
    },
  });

  return (
    <Stack>
      {isLoading && <Loader />}
      {nfts &&
        nfts.map((nft: Token) => {
          return (
            <Card>
              <Stack>
                <Text>{nft.name}</Text>
              </Stack>
            </Card>
          );
        })}
    </Stack>
  );
}
