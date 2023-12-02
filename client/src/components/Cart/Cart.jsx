import { useContext } from "react";
import { Context } from "../../utils/context";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "../Cart/CartItem/CartItem";
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ setShowCart }) => {
  const { cartState } = useContext(Context);

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartState.cart,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {cartState.cart.length === 0 && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            {/* <button className="return-cta">RETURN TO CART</button> */}
          </div>
        )}
        <>
          {cartState.cart.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
          <div className="cart-footer">
            <div className="subtotal">
              <span className="text">Subtotal:</span>
              <span className="text total">&#8377;{cartState.subTotal}</span>
            </div>
            <div className="button">
              <button className="checkout-cta" onClick={handlePayment}>
                Checkout
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Cart;
