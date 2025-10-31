import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import type { Address } from 'viem';

interface WalletContextType {
  address: Address | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  // Legacy compatibility properties
  wallet: { address: Address | undefined } | null;
  user: { hasWallet: boolean } | null;
  waas: any;
  isCreatingWallet: boolean;
  isLoggingIn: boolean;
  login: () => Promise<any>;
  createWallet: () => Promise<void>;
  restoreWallet: () => Promise<void>;
  logout: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  projectId?: string;
  verbose?: boolean;
  collectAndReportMetrics?: boolean;
  enableHostedBackups?: boolean;
  children: ReactNode;
}

export function WalletProvider({
  children,
}: WalletProviderProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(async () => {
    try {
      // Find Coinbase Wallet connector - check multiple possible IDs
      const coinbaseConnector = connectors.find(
        (connector: any) => 
          connector.id === 'coinbaseWalletSDK' || 
          connector.id === 'coinbaseWallet' ||
          connector.name?.toLowerCase().includes('coinbase')
      );
      
      if (coinbaseConnector) {
        connect({ connector: coinbaseConnector });
        // Note: wagmi's connect is synchronous but triggers async connection
        // The connection state will update via useAccount hook
      } else if (connectors.length > 0) {
        // Fallback to first available connector
        connect({ connector: connectors[0] });
      } else {
        console.error('No connectors available');
        throw new Error('No wallet connectors available');
      }
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }, [connect, connectors]);

  const handleDisconnect = useCallback(async () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  }, [disconnect]);

  // Legacy compatibility methods
  const login = useCallback(async () => {
    await handleConnect();
    return { hasWallet: isConnected };
  }, [handleConnect, isConnected]);

  const createWallet = useCallback(async () => {
    console.warn('Wallet creation not supported with wagmi. Users must connect existing wallets.');
  }, []);

  const restoreWallet = useCallback(async () => {
    await handleConnect();
  }, [handleConnect]);

  const logout = useCallback(async () => {
    await handleDisconnect();
  }, [handleDisconnect]);

  const value: WalletContextType = {
    address,
    isConnected,
    isConnecting,
    connect: handleConnect,
    disconnect: handleDisconnect,
    // Legacy compatibility
    wallet: address ? { address } : null,
    user: isConnected ? { hasWallet: true } : null,
    waas: null,
    isCreatingWallet: false,
    isLoggingIn: isConnecting,
    login,
    createWallet,
    restoreWallet,
    logout,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}

export function useEVMAddress(wallet: { address?: Address } | null) {
  // If wallet is provided, use its address
  if (wallet?.address) {
    return { address: wallet.address };
  }
  
  // Otherwise, try to get from wagmi account
  const { address } = useAccount();
  return address ? { address } : null;
}