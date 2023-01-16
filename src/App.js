import logo from './logo.svg';
import './App.css';
import WalletConnect from './Wallet Connect/WalletConnect';
import React from "react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";

function App() {
  const chains = [arbitrum, mainnet, polygon];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "8e6b5ffdcbc9794bf9f4a1952578365b" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <WalletConnect />
      </WagmiConfig>

      <Web3Modal
        projectId="8e6b5ffdcbc9794bf9f4a1952578365b"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
