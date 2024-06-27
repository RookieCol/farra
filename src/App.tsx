import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PurchaseFlow from "./views/PurchaseFlow";
import Home from "./views/Home";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>

    },
    {
      path: "/ticket",
      element: <PurchaseFlow/>,
    },
  ]);


 

  return (
    <RouterProvider router={router} />
     
   
  );
}

export default App;


 {/* <h1>Hello world</h1>
      <ConnectWalletButton />
      <CryptoElements stripeOnramp={stripeOnrampPromise}>
        {clientSecret && (
          <OnrampElement
            id="onramp-element"
            clientSecret={clientSecret}
            appearance={{ theme: "dark" }}
            onChange={onChange}
            onReady={() => {}}
          />
        )}
      </CryptoElements>
      {message && <div id="onramp-message">{message}</div>} */}