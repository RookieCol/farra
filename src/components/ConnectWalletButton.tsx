import { useState } from 'react';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { useEVMAddress, useWalletContext } from '@coinbase/waas-sdk-web-react';
import { Button } from '@nextui-org/react';
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity';

// const buttonStyles: React.CSSProperties = {
//   background: 'transparent',
//   border: '1px solid transparent',
//   boxSizing: 'border-box',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   fontFamily: 'Arial, sans-serif',
//   fontWeight: 'bold',
//   fontSize: 18,
//   gap: '8px',
//   backgroundColor: '#0052FF',
//   paddingLeft: 15,
//   paddingTop: 5,
//   color: 'white',
//   paddingBottom: 5,
//   cursor: 'pointer',
//   paddingRight: 30,
//   borderRadius: 10,
// };

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
      <Button
        variant='flat'
        color='primary'
        disabled={!waas || !!user || isLoggingIn}
        isLoading={isLoggingIn}
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
        className='font-semibold'
      >
        <CoinbaseWalletLogo />
        Login
      </Button>
    );
  if (wallet && address)
    return (
      <>

        <Button

          variant='flat'
          color='primary'
          onClick={async () => {
            await waas?.logout();
          }}
          disabled={!user}
          className='font-semibold '

        >
          <Avatar address='0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9' />
          <div >
            <Name className='text-inherit' address='0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9' />
            <Address className='text-inherit' address={address?.address} />
          </div>


        </Button>

      </>
    );
  return (
    <Button
      variant='flat'
      color='primary'
      disabled={!waas || !user || isCreatingWallet || !!wallet}
      isLoading={isCreatingWallet}
      className='font-semibold'

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
    </Button>
  );
}

export { ConnectWalletButton };
