import { Avatar, AvatarGroup, Divider, Image } from '@nextui-org/react'
import React from 'react'

function TicketSummary() {
  return (
    <div className='flex flex-col gap-4'>
    <Image className='w-80 h-80' src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/xr/10994a31-496e-49b7-9151-9ee51304c597' />
      
    <div className='flex flex-col gap-2'>

<span className='font-bold'>Organizator</span>
<Divider />
<div className='flex flex-row gap-2 justify-start items-center'>

<Avatar isBordered size='sm'  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
<p>Something</p>
</div>

</div>
        <div className='flex flex-col gap-2'>

            <span className='font-bold'>Location</span>
            <Divider />
            <p>street 23 # 49</p>
        </div>
        <div className='flex flex-col gap-2'>

            <span className='font-bold'>Date</span>
            <Divider />
            <p>25/06/2024</p>
        </div>
        <div className='flex flex-col gap-2'>
            <span className='font-bold'>assistants</span>
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