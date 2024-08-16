'use client';

import { Token } from '@/data/tokens';
import { Card, Loader, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

export default function TokensList() {
  const { address } = useWeb3ModalAccount();

  const { data: tokens, isLoading } = useQuery({
    queryKey: ['tokens', address],
    queryFn: async () => {
      const response = await fetch('/api/' + address + '/tokens');
      return response.json();
    },
  });

  return (
    <Stack>
      {isLoading && <Loader />}
      {tokens &&
        tokens.map((token: Token) => {
          return (
            <Card>
              <Stack>
                <Text>{token.name}</Text>
                <Text c={'dimmed'}>{token.balance}</Text>
              </Stack>
            </Card>
          );
        })}
    </Stack>
  );
}
