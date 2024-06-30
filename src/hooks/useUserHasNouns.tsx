import { useEffect, useState } from 'react';
import { type Address, createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

function useUserHasNouns(user: Address) {
  const [userHasNouns, setUserHasNouns] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  console.debug(user)
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const balance = await publicClient.readContract({
        address: '0x0E971175fe38908384ff01Fb505AF857260AAdAF',
        abi: [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
        ] as const,
        functionName: 'balanceOf',
        args: [user],
      });
      console.debug(balance)
      setUserHasNouns(Number(balance) > 0);
      setIsLoading(false);
    })();
  }, [user]);

  return { userHasNouns, isLoading };
}

export default useUserHasNouns;
