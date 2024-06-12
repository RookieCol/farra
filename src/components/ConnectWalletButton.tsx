import React, { useState } from 'react';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { useEVMAddress, useWalletContext } from '@coinbase/waas-sdk-web-react';

const buttonStyles: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: 18,
  gap: '8px',
  backgroundColor: '#0052FF',
  paddingLeft: 15,
  paddingTop: 5,
  color: 'white',
  paddingBottom: 5,
  cursor: 'pointer',
  paddingRight: 30,
  borderRadius: 10,
};

enum ButtonText {
  CreateWallet = 'Create Wallet',
  CreatingWallet = 'Creating Wallet...',
  ConnectigWallet = 'Connecting Wallet...',
}

function ConnectWalletButton() {
  const { waas, user, isCreatingWallet, wallet, isLoggingIn } =
    useWalletContext();
  const [buttonText, setButtonText] = useState(ButtonText.CreateWallet);
  const address = useEVMAddress(wallet);
  if (!user)
    return (
      <button
        style={buttonStyles}
        disabled={!waas || !!user || isLoggingIn}
        onClick={async () => {
          const user = await waas!.login();
          console.debug('user', user);
          if (user!.hasWallet) {
            console.debug('restoring wallet');
            setButtonText(ButtonText.ConnectigWallet);
            user!.restoreFromHostedBackup!();
          } else {
            setButtonText(ButtonText.CreatingWallet);
            console.debug('creating wallet');
            user!.create();
          }
        }}
      >
        <CoinbaseWalletLogo />
        Login
      </button>
    );
  if (wallet)
    return (
      <>
        <div>
          {address && <p>Your address is: {address.address}</p>}
          {!address && <p>No wallet.</p>}
        </div>
        <button
          style={buttonStyles}
          onClick={async () => {
            await waas?.logout();
          }}
          disabled={!user}
        >
          <CoinbaseWalletLogo />
          Logout
        </button>
      </>
    );
  return (
    <button
      style={buttonStyles}
      disabled={!waas || !user || isCreatingWallet || !!wallet}
      onClick={async () => {
        // check if your user has a wallet, and restore it if they do!
        if (user!.hasWallet) {
          setButtonText(ButtonText.ConnectigWallet);
          user!.restoreFromHostedBackup!();
        } else {
          setButtonText(ButtonText.CreatingWallet);
          user!.create();
        }
      }}
    >
      <CoinbaseWalletLogo />

      {buttonText}
    </button>
  );
}

export { ConnectWalletButton };
