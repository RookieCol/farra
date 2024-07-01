import useSmartAccountClient from '@/hooks/useGasless'
import useSpendance from '@/hooks/useSpendance'
import { useEVMAddress, useWalletContext } from '@coinbase/waas-sdk-web-react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { Address, createPublicClient, encodeFunctionData, erc20Abi, http, parseUnits, zeroAddress } from 'viem'
import { baseSepolia } from 'viem/chains'

function PayWithCryptoButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [hash, setHash] = useState<Address>(zeroAddress)
    const [email, setEmail] = useState<null | string>(null)
    const [isEmailLoading, setIsEmailLoading] = useState(false)
    const { smartAccountClient } = useSmartAccountClient()
    const { wallet } = useWalletContext()

    const address = useEVMAddress(wallet)
    const { spendance } = useSpendance(address?.address ?? zeroAddress)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleClaimTicket = async () => {
        const ABI = [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_currency",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_pricePerToken",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "bytes32[]",
                            "name": "proof",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "quantityLimitPerWallet",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pricePerToken",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "currency",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct IDrop.AllowlistProof",
                    "name": "_allowlistProof",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "claim",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }] as const
        const contractAddress = '0xFf28015E395aD24EFAA1f0Ea33Bb409B043a0bea'
        const tx = await smartAccountClient?.sendTransaction({
            account: smartAccountClient.account,
            to: contractAddress,
            value: BigInt(0),
            data: encodeFunctionData({
                abi: ABI,
                functionName: 'claim',
                args: [
                    address!.address,
                    1n,
                    '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
                    100000n,

                    {
                        proof: [
                            "0x0000000000000000000000000000000000000000000000000000000000000000" as Address
                        ],
                        quantityLimitPerWallet: 1n,
                        pricePerToken: 100000n,
                        currency: '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
                    },
                    '0x'
                ]
            })
        })
        console.debug(tx)
        setHash(tx!)
        return tx

    }
    const handleApproveToken = async () => {

        const contractAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        const tx = await smartAccountClient?.sendTransaction({
            account: smartAccountClient.account,
            to: contractAddress,
            value: BigInt(0),
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: 'approve',
                args: [
                    '0xFf28015E395aD24EFAA1f0Ea33Bb409B043a0bea',
                    parseUnits('100', 6)
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
        setIsLoading(true)
        try {

            if (spendance < 1) {
                const approveHash = await handleApproveToken()
                publicClient.waitForTransactionReceipt({ hash: approveHash!, confirmations: 1 })
                const claimHash = await handleClaimTicket()
                publicClient.waitForTransactionReceipt({ hash: claimHash!, confirmations: 1 })
            } else {
                const claimHash = await handleClaimTicket()
                publicClient.waitForTransactionReceipt({ hash: claimHash!, confirmations: 1 })
            }


            setIsLoading(false)
            onOpen()
        } catch (e) {
            console.error(e)
            setIsLoading(false)
        }
    }
    const handleCloseModal = async (onClose: () => void) => {
        setIsEmailLoading(true)
        await fetch('https://stripe-sessions-production.up.railway.app/send-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_email: email
            })

        })
        onClose();
    }


    const copyHashToClipboard = () => {
        navigator.clipboard.writeText(hash).then(() => {
            console.log('Hash copied to clipboard');
        }).catch(err => {
            console.error('Error copying hash to clipboard', err);
        });
    };
    
    return (
        <>

            <Button isLoading={isLoading} onClick={handleClickButton}>Pay with Crypto</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-black/50 backdrop-opacity-40",
                    base: "border-black bg-black dark:bg-black text-white",
                    header: "border-b-[1px] border-white/20",
                    footer: "border-t-[1px] border-white/20",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Congratulations!</ModalHeader>
                            <ModalBody className='text-center'>
                                <p>You have claimed your ticket, it should sent to your
                                    email address.
                                </p>
                                <Input className='email-input' value={email ?? undefined} onChange={(e) => setEmail(e.target.value)} variant='underlined' type="email" label="Email" placeholder="Enter your email" />

                                <div  onClick={copyHashToClipboard} className='flex gap-1 justify-center items-center cursor-pointer font-light'>
                                    <Copy size='14' />
                                    <p className='text-inherit font-light'>
                                        {hash.slice(0, 6)}...{hash.slice(-4)}
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter>

                                <Button isLoading={isEmailLoading} fullWidth color='primary' variant='flat' onPress={() => handleCloseModal(onClose)}>
                                    Cheers!
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

export default PayWithCryptoButton