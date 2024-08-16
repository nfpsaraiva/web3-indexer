'use client';

import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Center,
  Group,
  Loader,
  NumberInput,
  Stack,
  Text,
  Timeline,
} from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IconCube, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { getLastBlockNumber } from '@/actions/blocks';
import { Block } from '@/data/blocks';

interface BlocksListProps {
  blockNumber: number;
}

export default function BlocksList({ blockNumber }: BlocksListProps) {
  const [number, setNumber] = useState(blockNumber);
  const [debouncedNumber] = useDebouncedValue(number, 300);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['blocks', debouncedNumber],
      queryFn: async ({ pageParam }) => {
        const response = await fetch('/api/blocks?cursor=' + pageParam);
        return await response.json();
      },
      getNextPageParam: (lastPage) => {
        const lastNumber = lastPage[lastPage.length - 1].number;
        return lastNumber > 1 ? lastNumber - 1 : null;
      },
      initialPageParam: debouncedNumber,
    });

  const refresh = async () => {
    const blockNumber = await getLastBlockNumber();
    setNumber(blockNumber);
  };

  return (
    <Stack gap={'xl'} align="center">
      <Card>
        <Group>
          <NumberInput size="md" value={number} onChange={(value) => setNumber(Number(value))} />
          <ActionIcon
            variant="subtle"
            size={'lg'}
            color="var(--mantine-color-text)"
            onClick={refresh}
          >
            <IconRefresh />
          </ActionIcon>
        </Group>
      </Card>
      <Center>
        {isLoading && <Loader />}
        {isError && <Text>Something went wrong</Text>}
        <Timeline active={0} bulletSize={24} lineWidth={2}>
          {data &&
            data.pages &&
            data.pages.map((page) => {
              return page.map((block: Block) => {
                return (
                  <Timeline.Item bullet={<IconCube size={12} />} title={block.number}>
                    <Stack gap={2}>
                      <Text c="dimmed" size="xs">
                        {block.date}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {block.transactions.length} transactions
                      </Text>
                      <Text c={'dimmed'} size="xs" mt={4}>
                        {block.value} ETH
                      </Text>
                      <Anchor
                        c={'var(--mantine-color-text)'}
                        size="xs"
                        href={'https://etherscan.io/block/' + block.number}
                        target="_blank"
                      >
                        Details
                      </Anchor>
                    </Stack>
                  </Timeline.Item>
                );
              });
            })}
        </Timeline>
      </Center>
      <Button
        my={'md'}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </Button>
    </Stack>
  );
}
