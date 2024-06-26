import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckoutForm = ({ amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://api-airtalx.vercel.app/v1/api/cit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setError(`Error: ${error.message}`));
  }, [amount, currency]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Include details such as name, address, email, etc.
            // These are optional but can be useful for Stripe's fraud prevention
          },
        },
      }
    );

    if (error) {
      console.error(error);
      setError(`Payment failed: ${error.message}`);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message,
      });
    } else if (paymentIntent.status === "succeeded") {
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment was successful!",
      });
      // You can handle success actions here, like updating UI or redirecting
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="amountInput">Amount ({currency})</label>
        <input
          id="amountInput"
          type="number"
          className="form-control"
          value={amount/100}
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Card details</label>
        <CardElement className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary mt-5" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {error && <div className="mt-3 text-danger">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
