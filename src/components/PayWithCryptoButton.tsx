import useSmartAccountClient from '@/hooks/useGasless'
import useSpendance from '@/hooks/useSpendance'
import { Button } from '@nextui-org/react'
import { createPublicClient, encodeFunctionData, http, parseEther, zeroAddress } from 'viem'
import { baseSepolia } from 'viem/chains'

function PayWithCryptoButton() {
    const { smartAccountClient } = useSmartAccountClient()
    const { wallet } = useWalletContext()
    const address = useEVMAddress(wallet)
    const { spendance } = useSpendance(address)
    const handleClaimTicket = async () => {
        const ABI = [
            "function ownerOf(uint tokenId) view returns (address)",
            "function balanceOf(address addr) view returns (uint)",
            "function claim(address _receiver, uint256 _quantity, address _currency, uint256 _pricePerToken, (bytes32[],uint256,uint256,address) _allowlistProof, bytes _data)",
        ]
        const contractAddress = '0xFf28015E395aD24EFAA1f0Ea33Bb409B043a0bea'
        const tx = await smartAccountClient?.sendTransaction({
            account: smartAccountClient.account,
            to: contractAddress,
            value: BigInt(0),
            data: encodeFunctionData({
                abi: ABI,
                functionName: 'claim',
                args: [
                    zeroAddress,
                    0,
                    zeroAddress,
                    0

                ]
            })
        })
        console.debug(tx)
        return tx

    }
    const handleApproveToken = async () => {
        const ABI = [
            "function approve(address spender, uint256 amount) returns (bool)",
        ]
        const contractAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        const tx = await smartAccountClient?.sendTransaction({
            account: smartAccountClient.account,
            to: contractAddress,
            value: BigInt(0),
            data: encodeFunctionData({
                abi: ABI,
                functionName: 'approve',
                args: [
                    '0xFf28015E395aD24EFAA1f0Ea33Bb409B043a0bea',
                    parseEther('100')
                ]
            })
        })
        console.debug(tx)
        return tx
    }

    const handleClickButton = async () => {
        const publicClient = createPublicClient({
            chain: baseSepolia,
            transport: http(),
        });
        if (spendance < 1) {
            const approveHash = await handleApproveToken()
            publicClient.waitForTransactionReceipt({ hash: approveHash!, confirmations: 1 })
            const claimHash = await handleClaimTicket()
            publicClient.waitForTransactionReceipt({ hash: claimHash!, confirmations: 1 })
        }else{
            const claimHash = await handleClaimTicket()
            publicClient.waitForTransactionReceipt({ hash: claimHash!, confirmations: 1 })
        }
    }

    return (
        <Button onClick={handleClickButton}>Pay with Crypto</Button>

    )
}

export default PayWithCryptoButton