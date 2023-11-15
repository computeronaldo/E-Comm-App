import { useContext } from "react";
import { Context } from "../../utils/context";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "../Cart/CartItem/CartItem";

import "./Cart.scss";

const Cart = ({ setShowCart }) => {
  const { cartState } = useContext(Context);
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
              <button className="checkout-cta">Checkout</button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Cart;
