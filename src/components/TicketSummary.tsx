import { Avatar, AvatarGroup, Divider } from '@nextui-org/react'
import { MapPin, Calendar, Clock } from 'lucide-react'

function TicketSummary() {
    return (
        <div className='flex flex-col gap-4'>
            {/* Location Section */}
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-sm'>Location</h3>
                <div className='flex items-start gap-2'>
                    <MapPin className='w-4 h-4 text-gray-400 mt-0.5 shrink-0' />
                    <div>
                        <p className='font-medium text-xs'>Rosedal café</p>
                        <p className='text-xs text-gray-400'>
                            Rue du Marché aux Fromages 9, 1000 Bruxelles, Belgium
                        </p>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Date Section */}
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-sm'>Date</h3>
                <div className='flex items-start gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400 mt-0.5 shrink-0' />
                    <div>
                        <p className='font-medium text-xs'>Sunday, 30th of June 2023</p>
                        <div className='flex items-center gap-2 mt-0.5'>
                            <Clock className='w-3 h-3 text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                19:00 - 22:00 GMT-5
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Attendees Section */}
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-sm'>Attendees</h3>
                <AvatarGroup className='flex-wrap' isBordered radius='full' size="sm">
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" size="sm" />
                </AvatarGroup>
            </div>
        </div>
    )
}

export default TicketSummary
