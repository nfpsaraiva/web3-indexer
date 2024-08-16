'use client';

import {
  AppShell as MantineAppShell,
  Group,
  Button,
  Center,
  ActionIcon,
  ThemeIcon,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconCircleFilled } from '@tabler/icons-react';
import Link from 'next/link';
import Header from '../Header/Header';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 100 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      footer={{ height: 80 }}
      padding="lg"
      withBorder={false}
    >
      <MantineAppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="xl" px={4}>
        <Stack align="center">
          <Button
            miw={50}
            size="md"
            c={'var(--mantine-color-text)'}
            fw={600}
            variant="subtle"
            component={Link}
            href="/blocks"
          >
            Blocks
          </Button>
          <Button
            miw={50}
            size="md"
            c={'var(--mantine-color-text)'}
            fw={600}
            variant="subtle"
            component={Link}
            href="/tokens"
          >
            Tokens
          </Button>
          <Button
            miw={50}
            size="md"
            c={'var(--mantine-color-text)'}
            fw={600}
            variant="subtle"
            component={Link}
            href="/nft"
          >
            NFT
          </Button>
        </Stack>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <Center>{children}</Center>
      </MantineAppShell.Main>

      <MantineAppShell.Footer px={'xl'}>
        <Group justify="space-between" h={'100%'}>
          <Group gap={'xl'} visibleFrom="sm">
            <ActionIcon size={'sm'} variant="transparent" color="var(--mantine-color-text)">
              <IconBrandGithub />
            </ActionIcon>
            <ActionIcon size={'sm'} variant="transparent" color="var(--mantine-color-text)">
              <IconBrandLinkedin />
            </ActionIcon>
          </Group>
          <Button
            variant="transparent"
            leftSection={
              <ThemeIcon color="green" variant="transparent">
                <IconCircleFilled size={10} />
              </ThemeIcon>
            }
            color="var(--mantine-color-text)"
            c={'dimmed'}
          >
            Ethereum Network
          </Button>
          <Group visibleFrom="sm">
            <Button
              miw={100}
              size="sm"
              c={'var(--mantine-color-text)'}
              fw={600}
              variant="transparent"
              component={Link}
              href="/about"
            >
              About
            </Button>
          </Group>
        </Group>
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}
