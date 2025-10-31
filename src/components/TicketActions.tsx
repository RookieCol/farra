import useUserHasNouns from '@/hooks/useUserHasNouns'
import { useAccount } from 'wagmi'
import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import { zeroAddress } from 'viem'
import PayWithFiat from './PayWithFiatButton'
import PayWithCryptoButton from './PayWithCryptoButton'

function TicketActions() {
    const { address } = useAccount()
    const { userHasNouns } = useUserHasNouns(address ?? zeroAddress)
    if (userHasNouns) return (
        <Card fullWidth>
            <CardHeader className='bg-foreground-card flex justify-between items-center'>
                <h2 className='font-bold'>

                    Checkout
                </h2>
                <Chip color="success" variant="flat"> <p className='font-semibold'>
                    Nouns holder
                </p>
                </Chip>

            </CardHeader>
            <CardBody className='gap-3'>
                <div className='flex flex-col gap-1'>
                    <span className='font-light'>
                        Price of the ticket
                    </span>
                    <p className='font-extralight line-through text-xl'>
                        40,00 US$
                    </p>
                    <p className='font-semibold text-3xl'>
                        20,00US$</p>
                </div>
                <Divider />
                <div className='flex flex-col gap-2'>
                    <PayWithFiat />
                    <PayWithCryptoButton/>
                </div>
            </CardBody>
        </Card>
    )

    return (
        <Card fullWidth>
            <CardHeader className='bg-foreground-card flex justify-between items-center'>
                <h2 className='font-bold'>

                    Checkout
                </h2>

            </CardHeader>
            <CardBody className='gap-3'>
                <div className='flex flex-col gap-1'>
                    <span className='font-light'>
                        Price of the ticket
                    </span>
                    <p className='font-semibold text-4xl'>
                        40,00 US$</p>
                </div>
                <Divider />
                <div className='flex flex-col gap-2'>

                    <PayWithFiat />
                    <PayWithCryptoButton/>
                </div>
            </CardBody>
        </Card>
    )
}

export default TicketActions