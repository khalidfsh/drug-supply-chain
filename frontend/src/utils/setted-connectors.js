import { Connectors } from 'web3-react'
const { MetaMaskConnector, WalletConnectConnector, NetworkOnlyConnector } = Connectors

const MetaMask = new MetaMaskConnector()

const Infura = new NetworkOnlyConnector({
  providerURL: ''
})

const MainConnectors = { MetaMask, Infura }
export default MainConnectors