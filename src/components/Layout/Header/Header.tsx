'use client';

import { Anchor, Burger, Button, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { shortifyAddress } from '@/utils/addressUtils';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  const pathname = usePathname();
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();

  return (
    <Group h="100%" px="xl">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group justify="space-between" style={{ flex: 1 }} wrap="nowrap">
        <Anchor component={Link} href={'/'} underline="never" c={'var(--mantine-color-text)'}>
          <Title size={'h3'}>Web3 Indexer</Title>
        </Anchor>
        <Group visibleFrom="sm" justify="center">
          <Button
            miw={50}
            size="md"
            c={pathname === '/' ? 'var(--mantine-primary-color-4)' : 'var(--mantine-color-text)'}
            fw={600}
            variant={'transparent'}
            component={Link}
            href="/"
          >
            Blocks
          </Button>
          <Button
            miw={50}
            size="md"
            c={
              pathname === '/tokens'
                ? 'var(--mantine-primary-color-4)'
                : 'var(--mantine-color-text)'
            }
            fw={600}
            variant={'transparent'}
            component={Link}
            href="/tokens"
          >
            Tokens
          </Button>
          <Button
            miw={50}
            size="md"
            c={pathname === '/nft' ? 'var(--mantine-primary-color-4)' : 'var(--mantine-color-text)'}
            fw={600}
            variant={'transparent'}
            component={Link}
            href="/nft"
          >
            NFT
          </Button>
        </Group>
        {isConnected ? (
          <Button onClick={() => open()} variant="light">
            {shortifyAddress(address)}
          </Button>
        ) : (
          <Button onClick={() => open()}>Connect Wallet</Button>
        )}
      </Group>
    </Group>
  );
}
