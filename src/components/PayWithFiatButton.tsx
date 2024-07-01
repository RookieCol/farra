import { Button } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { CryptoElements, OnrampElement } from '@/components/StripeFiat';
import { loadStripeOnramp } from '@stripe/crypto';
import { Modal, ModalContent, useDisclosure, ModalFooter } from "@nextui-org/react";
import { useEVMAddress, useWalletContext } from '@coinbase/waas-sdk-web-react';


const stripeOnrampPromise = loadStripeOnramp(
    "pk_test_51Hjzj6H0FO59ioJ3X5qXYwDqGuRsSCWD8bMYJGthOw6Xi24DzlMBLIjFVZfLpeoPuk2SqB7uYZN0Lymci50P9P1400eUytv3lz"
);

function
    PayWithFiat() {
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState({ status: '', tx_id: '' });
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { wallet } = useWalletContext()

    const address = useEVMAddress(wallet)

    useEffect(() => {
        // Fetches an onramp session and captures the client secret
        if(!address?.address) return;
        fetch(
            "https://stripe-sessions-production.up.railway.app/create-onramp-session",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transaction_details: {
                        wallet_address: address?.address,
                        destination_currency: "usdc",
                        destination_currencies: ["usdc", "eth"],
                        destination_exchange_amount: "13.37",
                        destination_network: "ethereum",
                    },
                    customer_information: {
                        email: "john@doe.com",
                        first_name: "John",
                        last_name: "Doe",
                        dob: {
                            day: 4,
                            month: 4,
                            year: 1990,
                        },
                    }
                }),
            })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [address?.address]);


    const onChange = useCallback(({ session }: { session: { status: string, transaction_id: string } }) => {
        console.log("session", session);
        setMessage({status: session.status, tx_id: session.transaction_id });
    }, []);

    console.log("clientSecret", clientSecret);

    const handleCloseModal = async (onClose: () => void) => {
        setIsLoading(true);
        onClose();
        setInterval(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <>
            <Button onPress={onOpen}>Pay with Fiat</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className='bg-[#1A1B25]'>
                    {(onClose) => (
                        <>
                                <CryptoElements stripeOnramp={stripeOnrampPromise}>
                                    {clientSecret && (
                                        <OnrampElement
                                            id="onramp-element"
                                            clientSecret={clientSecret}
                                            appearance={{ theme: "dark" }}
                                            onChange={onChange}
                                            onReady={message}
                                        />
                                    )}
                                </CryptoElements>
                                <ModalFooter>

                                <Button isLoading={isLoading} fullWidth color='primary' variant='flat' onPress={() => handleCloseModal(onClose)}>
                                    Cheers!
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default PayWithFiat
