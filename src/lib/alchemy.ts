import { Alchemy, AlchemySettings, Network } from 'alchemy-sdk';

// Configuration for Alchemy
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
  connectionInfoOverrides: {
    skipFetchSetup: true,
  },
} as AlchemySettings;

// Singleton instance
let alchemyInstance: Alchemy | null = null;

export function getAlchemyInstance(): Alchemy {
  if (!alchemyInstance) {
    alchemyInstance = new Alchemy(config);
  }
  return alchemyInstance;
}
