import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { checkoutCart } from '../../store/cart/Cart.actions';

import './CheckoutForm.css';

function CheckoutForm() {

  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();

  const { cart } = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  const [isPaymentLoading] = useState(false);

  async function processPayment(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      
      const { token } = await stripe.createToken(cardElement);
      const checkoutItems = {
        cartId: cart.id,
        paymentInfo: token,
        userId: user.id
      }
      await dispatch(checkoutCart(checkoutItems));

    } catch(err) {
      throw err;
    }
  }

  return (
    <div style={{ padding: "3rem", width: '100%'}}>
      <div style={{ maxWidth: "500px", margin: "0 auto"}}>
        <form style={{ display: "block", width: "100%"}}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardElement
              className="card"
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
              onClick={processPayment}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;