import { Avatar, AvatarGroup, Divider, Image } from '@nextui-org/react'
import NounsParty from '@/assets/nouns_party.jpg'
import { LocateIcon, MapPinned } from 'lucide-react'

function TicketSummary() {
    return (
        <div className='flex flex-col gap-4'>
            <Image isBlurred className='w-80 h-80' src={NounsParty} />

            <div className='flex flex-col gap-2'>

                <span className='font-bold'>Organizator</span>
                <Divider />
                <div className='flex flex-row gap-2 justify-start items-center'>

                    <Avatar isBordered size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <p>Something</p>
                </div>

            </div>
            <div className='flex flex-col gap-2'>
                    <span className='font-bold'>Location</span>
                <Divider />
                <p>Rue du Marché aux Fromages 9, 1000 Bruxelles, Bélgica</p>
            </div>
            <div className='flex flex-col gap-2'>

                <span className='font-bold'>Date</span>
                <Divider />
                <div>

                Sunday, 30th of June 2023
                <p className='font-light'>
                19:00 - 22:00 GMT-5
                </p>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-bold'>Assistants</span>
                <Divider orientation='horizontal' />
                <AvatarGroup className='pt-2' isBordered radius='full'>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
            </div>

        </div>

    )
}

export default TicketSummary