import  { useEffect, useState } from 'react'
import { type Address, createPublicClient, erc20Abi, http } from 'viem';
import { baseSepolia } from 'viem/chains';

function useSpendance(user: Address) {
    const [spendance, setSpendance] = useState(0)
    const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(),
    });
    useEffect(() => {
        (async () => {
            const spendance = await publicClient.readContract({
                address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
                abi: erc20Abi,
                functionName: 'allowance',
                args: [user, '0xFf28015E395aD24EFAA1f0Ea33Bb409B043a0bea']
            })
            setSpendance(Number(spendance))
        })()
    }, [user])
    return { spendance }
}

export default useSpendance