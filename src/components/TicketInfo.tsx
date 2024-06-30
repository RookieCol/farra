import { Divider } from '@nextui-org/react'
import TicketActions from './TicketActions'

function TicketInfo() {
    return (
        <div className='flex flex-col items-start  gap-4 '>
            <h2 className='font-bold text-5xl'>Nouns party</h2>
            <Divider />
            <h2 className='font-bold text-xl'>Description</h2>
            <p>
                The BIGGEST & Best Vibe Party in the Nouns ecosystem! 🎊
                <br />
                <br />

                Together, we can build the colorful and creative future we all want. 🌈✨

                <br />
                <br />
                Enjoy multi-stage music with something for everyone. 🎶
                <br />
                <br />

                Projection-mapped structures and breathtaking artwork. 🎨
                <br />
                <br />

                The Nouns Festival is a multi-day experience at Nouns Village that includes impact investor pitch competitions, transformative workshops, keynotes, & this life-changing party!
            </p>
            <Divider />
            <TicketActions />

        </div>
    )
}

export default TicketInfo