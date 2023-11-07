import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ innerPage, relativeProducts, products }) => {
  const productsData = products;

  return (
    <div className="products-container">
      {relativeProducts && <div className="sec-heading">Related Products</div>}
      {!innerPage && <div className="sec-heading">Section Heading</div>}
      <div className="products">
        {productsData.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
