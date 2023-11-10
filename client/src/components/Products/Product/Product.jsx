import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="thumbnail">
        <img
          src={`http://localhost:1337${product?.attributes?.img?.data[0]?.attributes?.formats?.small?.url}`}
          alt={`${product?.attributes?.img?.data[0]?.attributes?.formats?.small?.name}`}
        />
      </div>
      <div className="prod-details">
        <span className="name">{product?.attributes?.title}</span>
        <span className="price">&#8377; {product?.attributes?.price}</span>
      </div>
    </div>
  );
};

export default Product;
