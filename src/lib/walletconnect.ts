'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

export default function connectWeb3Modal() {
  // 1. Get projectId
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

  // 2. Set chains
  const mainnet = {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 0,
    name: process.env.NEXT_PUBLIC_CHAIN_NAME || '',
    currency: process.env.NEXT_PUBLIC_CHAIN_CURRENCY || '',
    explorerUrl: process.env.NEXT_PUBLIC_CHAIN_ETHERSCAN_URL || '',
    rpcUrl: process.env.NEXT_PUBLIC_CHAIN_RPC_URL || '',
  };

  // 3. Create a metadata object
  const metadata = {
    name: 'Notes256',
    description: 'Multi-storage note taking app',
    url: 'https://app.notes256.com', // origin must match your domain & subdomain
    icons: [],
  };

  // 4. Create Ethers config
  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
  });

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: false,
    themeMode: 'dark',
  });
}
