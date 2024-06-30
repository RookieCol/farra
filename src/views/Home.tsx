
// import { ConnectWalletButton } from '@/components/ConnectWalletButton';
// import { CryptoElements, OnrampElement } from '@/components/StripeFiat';
import SDFGeometry from '@/components/SDFGeometry';

// Make sure to call loadStripeOnramp outside of a component’s render to avoid
// recreating the StripeOnramp object on every render.
// This is your test publishable API key.
// const stripeOnrampPromise = loadStripeOnramp(
//   "pk_test_51Hjzj6H0FO59ioJ3X5qXYwDqGuRsSCWD8bMYJGthOw6Xi24DzlMBLIjFVZfLpeoPuk2SqB7uYZN0Lymci50P9P1400eUytv3lz"
// );


function Home() {

    return (
 
      <section className='grow flex flex-col justify-center items-center'>
      <SDFGeometry />
        <h1 className='text-xl font-orbitron font-semibold'>Tokenizing one event at a time</h1>
      </section>
  )
}

export default Home