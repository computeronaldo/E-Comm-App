import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { useContext } from "react";
import "./CartItem.scss";

const CartItem = ({ item }) => {
  const { dispatchFn } = useContext(Context);

  const handleAddition = () => {
    const productId = item.id;
    const productName = item.name;
    const productPrice = item.price;
    const productImgPath = item.imgPath;
    const productQuantity = 1;
    dispatchFn({
      type: "ADD_TO_CART",
      payload: {
        cartItem: {
          id: productId,
          name: productName,
          price: productPrice,
          imgPath: productImgPath,
          quantity: productQuantity,
        },
      },
    });
  };

  const handleRemoval = (removeAll = false) => {
    const productId = item.id;
    const productName = item.name;
    const productPrice = item.price;
    const productImagePath = item.imgPath;
    const productQuantity = removeAll ? item.quantity : 1;

    dispatchFn({
      type: "REMOVE_FROM_CART",
      payload: {
        cartItem: {
          id: productId,
          name: productName,
          price: productPrice,
          imgPath: productImagePath,
          quantity: productQuantity,
        },
      },
    });
  };

  return (
    <div className="cart-products">
      <div className="cart-product">
        <div className="img-container">
          <img src={`http://localhost:1337${item.imgPath}`} alt="product-img" />
        </div>
        <div className="prod-details">
          <span className="name">{item.name}</span>
          <MdClose className="close-btn" onClick={() => handleRemoval(true)} />
          <div className="quantity-buttons">
            <span onClick={() => handleRemoval()}>-</span>
            <span>{item.quantity}</span>
            <span onClick={() => handleAddition()}>+</span>
          </div>
          <div className="text">
            <span>{item.quantity}</span>
            <span>x</span>
            <span className="highlight">&#8377;{item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
