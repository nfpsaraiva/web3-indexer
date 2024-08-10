'use client';

import { AppShell as MantineAppShell, Burger, Group, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import classes from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title>Web3 Indexer</Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.menuControl}>Home</UnstyledButton>
              <UnstyledButton className={classes.menuControl}>Blog</UnstyledButton>
              <UnstyledButton className={classes.menuControl}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.menuControl}>Support</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.menuControl}>Home</UnstyledButton>
        <UnstyledButton className={classes.menuControl}>Blog</UnstyledButton>
        <UnstyledButton className={classes.menuControl}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.menuControl}>Support</UnstyledButton>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
