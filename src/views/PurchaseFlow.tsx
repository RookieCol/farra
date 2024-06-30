import TicketInfo from '@/components/TicketInfo';
import TicketSummary from '@/components/TicketSummary'

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