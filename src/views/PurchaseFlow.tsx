import TicketInfo from '@/components/TicketInfo';
import TicketSummary from '@/components/TicketSummary';
import { Image, Avatar, Divider } from '@nextui-org/react'
import NounsParty from '@/assets/nouns_party.jpg'

function PurchaseFlow() {
    return (
        <section className='w-full flex justify-center py-4 md:py-6'>
            <div className='w-full max-w-5xl flex flex-col md:flex-row px-6 md:px-12 lg:px-16 gap-4 md:gap-6'>
                {/* Mobile Cover Image */}
                <div className='w-full h-[300px] relative overflow-hidden bg-black flex items-center justify-center md:hidden rounded-lg'>
                    <Image 
                        src={NounsParty}
                        alt="Event cover"
                        className='w-full h-auto max-h-[320px] object-contain'
                        radius="none"
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />
                </div>
                
                {/* Left Column - Image, Hosted By, Presented By */}
                <div className='hidden md:flex md:flex-col md:w-[240px] lg:w-[260px] flex-shrink-0'>
                {/* Cover Image */}
                <div className='w-full aspect-square overflow-hidden bg-black flex items-center justify-center rounded-lg relative max-h-[240px] lg:max-h-[260px]'>
                    <Image 
                        src={NounsParty}
                        alt="Event cover"
                        className='w-full h-full object-contain'
                        radius="none"
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />
                </div>
                
                {/* Presented by */}
                <div className='py-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-xs text-gray-400 uppercase tracking-wide'>Presented by</div>
                        <div className='flex items-center gap-2'>
                            <Avatar 
                                isBordered 
                                size='sm' 
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className="w-10 h-10"
                            />
                            <div>
                                <p className='font-semibold text-xs'>Nouns DAO</p>
                                <p className='text-xs text-gray-400'>Hosted By</p>
                            </div>
                        </div>
                    </div>
                    
                    <Divider className='my-4' />
                    
                    {/* Sidebar Info */}
                    <TicketSummary />
                </div>
            </div>
            
                {/* Right Column - Main Content */}
                <div className='flex-1 max-w-2xl'>
                    <TicketInfo />
                </div>
            </div>
        </section>
    );
}

export default PurchaseFlow
