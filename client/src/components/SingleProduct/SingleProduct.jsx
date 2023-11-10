import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: productData } = useFetch(
    `/api/products?populate=*&[filters][id]=${id}`
  );

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={`http://localhost:1337${productData?.data[0]?.attributes?.img?.data[0]?.attributes?.formats?.small?.url}`}
              alt="product-img"
            />
          </div>
          <div className="right">
            <span className="name">
              {productData?.data[0]?.attributes?.title}
            </span>
            <span className="price">
              {productData?.data[0]?.attributes?.price}
            </span>
            <span className="description">
              {productData?.data[0]?.attributes?.desc}
            </span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span>-</span>
                <span>5</span>
                <span>+</span>
              </div>
              <button className="add-to-cart-button">
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divide" />
            <div className="info-item">
              <span className="text-bold">
                Category:
                <span>
                  {
                    productData?.data[0]?.attributes?.categories?.data[0]
                      ?.attributes?.title
                  }
                </span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedin size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        {productData && (
          <RelatedProducts
            productId={id}
            categoryId={
              productData?.data[0]?.attributes?.categories?.data[0]?.id
            }
          />
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
