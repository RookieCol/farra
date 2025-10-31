import useUserHasNouns from '@/hooks/useUserHasNouns'
import { useAccount } from 'wagmi'
import { zeroAddress } from 'viem'
import PayWithFiat from './PayWithFiatButton'
import PayWithCryptoButton from './PayWithCryptoButton'

function TicketActions() {
    const { address } = useAccount()
    const { userHasNouns } = useUserHasNouns(address ?? zeroAddress)
    if (userHasNouns) return (
        <div className="relative z-0 rounded-lg border-2 border-gray-700 bg-black overflow-hidden">
            <div className='bg-gray-900/50 flex justify-between items-center flex-wrap gap-2 px-4 py-3 border-b-2 border-gray-700'>
                <h2 className='font-bold text-base md:text-lg text-white'>
                    Checkout
                </h2>
                <span className="px-2 py-1 rounded-md bg-green-950/30 border border-green-700/50">
                    <p className='font-semibold text-xs text-green-400'>
                        Nouns holder
                    </p>
                </span>
            </div>
            <div className='gap-3 px-4 py-4 flex flex-col'>
                <div className='flex flex-col gap-1.5'>
                    <span className='font-light text-xs md:text-sm text-gray-400'>
                        Price of the ticket
                    </span>
                    <p className='font-extralight line-through text-sm md:text-base text-gray-500'>
                        40,00 US$
                    </p>
                    <p className='font-semibold text-xl md:text-2xl lg:text-3xl text-white'>
                        20,00 US$
                    </p>
                </div>
                <div className="h-px bg-gray-700 my-1" />
                <div className='flex flex-col gap-2'>
                    <PayWithFiat />
                    <PayWithCryptoButton/>
                </div>
            </div>
        </div>
    )

    return (
        <div className="relative z-0 rounded-lg border-2 border-gray-700 bg-black overflow-hidden">
            <div className='bg-gray-900/50 flex justify-between items-center px-4 py-3 border-b-2 border-gray-700'>
                <h2 className='font-bold text-base md:text-lg text-white'>
                    Checkout
                </h2>
            </div>
            <div className='gap-3 px-4 py-4 flex flex-col'>
                <div className='flex flex-col gap-1.5'>
                    <span className='font-light text-xs md:text-sm text-gray-400'>
                        Price of the ticket
                    </span>
                    <p className='font-semibold text-xl md:text-2xl lg:text-3xl text-white'>
                        40,00 US$
                    </p>
                </div>
                <div className="h-px bg-gray-700 my-1" />
                <div className='flex flex-col gap-2'>
                    <PayWithFiat />
                    <PayWithCryptoButton/>
                </div>
            </div>
        </div>
    )
}

export default TicketActions