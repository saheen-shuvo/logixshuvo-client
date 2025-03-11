import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const parcel = location.state?.parcel || "No Parcel Found";
  // console.log(parcel);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { charge: parcel?.deliveryCharge })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, parcel?.deliveryCharge]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // CONFIRM PAYMENT
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

      if (confirmError) {
        console.log("confirm error");
      } else {
        console.log("payment intent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          // console.log("transaction id", paymentIntent.id);
          setTransactionId(paymentIntent.id);
           Swal.fire("Success", "Payment Successful!", "success");

          //  NOW POST THE PAYMENT INTO DB
          const payment = {
            email: user?.email,
            charge: parcel?.deliveryCharge,
            transactionId: paymentIntent.id,
            date: new Date(),
            parcelId: parcel?._id,
            paymentStatus: "paid"
          }

          const res = await axiosSecure.post('/payments', payment);
          console.log('payment saved', res);

        }
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          PAY
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
