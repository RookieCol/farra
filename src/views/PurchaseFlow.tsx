import TicketInfo from '@/components/TicketInfo';
import TicketSummary from '@/components/TicketSummary'
import { Avatar, AvatarGroup, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react'
import React from 'react'

function PurchaseFlow() {
    return (

        <section className='flex justify-center  w-full items-center'>
            <div className='ticket-container gap-8 w-3/5'>
                <TicketSummary />
                <TicketInfo />
            </div>
        </section>

    );
};

export default PurchaseFlow