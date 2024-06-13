import { http, createPublicClient, encodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';
import {
  createSmartAccountClient,
  ENTRYPOINT_ADDRESS_V06,
} from 'permissionless';
import { privateKeyToSimpleSmartAccount } from 'permissionless/accounts';
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';

const rpcUrl = import.meta.env.VITE_RPC_URL;

const publicClient = createPublicClient({
  transport: http(rpcUrl),
});

export async function getSmartAccountClient() {
  const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
    privateKey:
      '0x7c7c5b4b35c024ebc00d6d22b9304d566927a58f8ce4334875505c7550140d55',
    factoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  });

  const cloudPaymaster = createPimlicoPaymasterClient({
    chain: baseSepolia,
    transport: http(rpcUrl),
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  });

  const smartAccountClient =  createSmartAccountClient({
    account: simpleAccount,
    chain: baseSepolia,
    bundlerTransport: http(rpcUrl),
    middleware: {
      sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
    },
  });
  return smartAccountClient;
}
