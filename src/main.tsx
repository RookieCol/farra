import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from "@coinbase/waas-sdk-web-react";
import { NextUIProvider } from '@nextui-org/react';
import '@fontsource-variable/orbitron';

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WalletProvider projectId={PROJECT_ID} verbose collectAndReportMetrics enableHostedBackups>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </NextUIProvider>
  </WalletProvider>
)