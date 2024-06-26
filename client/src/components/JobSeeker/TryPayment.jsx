// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import React from "react";

// const Payment2 = () => {
//   const makePayment = async () => {
//     const stripe = await loadStripe(
//       "pk_test_51NElpiAhkmdcIHMiGJQEC60TQ7b4WD0ciHvkYmv4aMCbHmN67cW8MVjhC4piW378B15iWKi2vkoNQyy2QXSnkIoR00GW451Is6"
//     );
//     const body = {
//       amount : 5000,
//     }

//     const response  = await axios.post("https://api-airtalx.vercel.app/v1/api/paymen/str", body);

//     const session = await response.json( )
//     const result = stripe.redirectToCheckout({
//       sessionId: session.id
//     })

//     console.log(result);
//   };
//   return <div className="max-w-4xl mx-auto">
    
//     <button className="btn btn-warnng" onClick={makePayment}>
//       Paymnt
//     </button>
//   </div>;
// };

// export default Payment2;
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51NElpiAhkmdcIHMiGJQEC60TQ7b4WD0ciHvkYmv4aMCbHmN67cW8MVjhC4piW378B15iWKi2vkoNQyy2QXSnkIoR00GW451Is6");

const Payment2 = () => {
  return (
    <div className="m-2 border border-base-300 p-3 rounded-2xl my-10 max-w-5xl mx-auto">
      <Elements stripe={stripePromise}>
      <CheckoutForm amount={4900} currency="usd" />
    </Elements>
    </div>
  );
};

export default Payment2;
