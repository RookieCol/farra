import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import '@fontsource-variable/orbitron';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getConfig } from './wagmi';

const config = getConfig();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider chain={base}>
        <NextUIProvider>
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </NextUIProvider>
      </OnchainKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
)