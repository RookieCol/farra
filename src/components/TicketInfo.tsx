import { Divider } from '@nextui-org/react'
import TicketActions from './TicketActions'
import TicketSummary from './TicketSummary'
import { Avatar } from '@nextui-org/react'

function TicketInfo() {
    return (
        <div className='flex flex-col items-start gap-5 w-full'>
            {/* Title */}
            <div className='flex flex-col gap-1.5'>
                <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl'>Nouns party</h1>
                <p className='text-gray-400 text-xs md:text-sm'>The Zama CoFHE Shop — DevConnect BA 2025</p>
            </div>

            {/* Mobile - Presented by */}
            <div className='md:hidden flex flex-col gap-3'>
                <div className='text-sm text-gray-400 uppercase tracking-wide'>Presented by</div>
                <div className='flex items-center gap-3'>
                    <Avatar 
                        isBordered 
                        size='md' 
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className='font-semibold text-base'>Nouns DAO</p>
                        <p className='text-sm text-gray-400'>Hosted By</p>
                    </div>
                </div>
            </div>

            <Divider className='md:hidden' />

            {/* Checkout Section */}
            <div id="checkout-section" className='w-full'>
                <TicketActions />
            </div>

            <Divider />

            {/* About Event */}
            <div className='w-full'>
                <h2 className='font-bold text-lg mb-3'>About Event</h2>
                <div className='text-xs md:text-sm leading-relaxed space-y-2'>
                    <p>
                        The BIGGEST & Best Vibe Party in the Nouns ecosystem! 🎊
                    </p>
                    <p>
                        Together, we can build the colorful and creative future we all want. 🌈✨
                    </p>
                    <p>
                        Enjoy multi-stage music with something for everyone. 🎶
                    </p>
                    <p>
                        Projection-mapped structures and breathtaking artwork. 🎨
                    </p>
                    <p>
                        The Nouns Festival is a multi-day experience at Nouns Village that includes impact investor pitch competitions, transformative workshops, keynotes, & this life-changing party!
                    </p>
                </div>
            </div>

            <Divider />

            {/* Mobile Sidebar */}
            <div className='md:hidden w-full'>
                <TicketSummary />
            </div>
        </div>
    )
}

export default TicketInfo
