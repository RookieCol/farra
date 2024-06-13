import { useEffect, useState } from 'react';
import { type Address, createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

function useUserHasNouns(user: Address) {
  const [userHasNouns, setUserHasNouns] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  useEffect(() => {
    (async () => {
      const balance = await publicClient.readContract({
        address: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'owner', type: 'address' },
            ],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ] as const,
        functionName: 'balanceOf',
        args: [user],
      });
      setUserHasNouns(Number(balance) > 0);
      setIsLoading(false);
    })();
  }, []);

  return { userHasNouns, isLoading };
}

export default useUserHasNouns;
