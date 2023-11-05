import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ innerPage, relativeProducts }) => {
  return (
    <div className="products-container">
      {relativeProducts && <div className="sec-heading">Related Products</div>}
      {!innerPage && <div className="sec-heading">Section Heading</div>}
      <div className="products">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Products;
