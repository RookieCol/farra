import { Button } from '@nextui-org/react'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { CryptoElements, OnrampElement } from '@/components/StripeFiat';
import { loadStripeOnramp } from '@stripe/crypto';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useEVMAddress, useWalletContext } from '@coinbase/waas-sdk-web-react';


const stripeOnrampPromise = loadStripeOnramp(
    "pk_test_51Hjzj6H0FO59ioJ3X5qXYwDqGuRsSCWD8bMYJGthOw6Xi24DzlMBLIjFVZfLpeoPuk2SqB7uYZN0Lymci50P9P1400eUytv3lz"
);

function
    PayWithFiat() {
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { wallet } = useWalletContext()

    const address = useEVMAddress(wallet)

    useEffect(() => {
        // Fetches an onramp session and captures the client secret
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
    }, []);


    const onChange = useCallback(({ session }: { session: { status: string } }) => {
        console.log("session", session);
        setMessage(`OnrampSession is now in ${session.status} state.`);
    }, []);

    console.log("clientSecret", clientSecret);


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
                                            onReady={() => { }}
                                        />
                                    )}
                                </CryptoElements>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default PayWithFiat
