import TicketSummary from '@/components/TicketSummary'
import { Avatar, AvatarGroup, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react'
import React from 'react'

function PurchaseFlow() {
    return (

            <section className='flex justify-center items-center'>
                <div className='ticket-container max-w-[60vw]'>
                    <TicketSummary />
                    <div className='flex flex-col items-center '>
                        <h2 className='font-bold text-5xl'>AFK event</h2>
                    </div>
                </div>
            </section>

    );
};

export default PurchaseFlow