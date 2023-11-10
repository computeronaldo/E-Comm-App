import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ innerPage, relative, relatedProducts, products }) => {
  const productsData = relative ? relatedProducts : products;

  return (
    <div className="products-container">
      {relative && <div className="sec-heading">Related Products</div>}
      {!innerPage && <div className="sec-heading">Section Heading</div>}
      <div className="products">
        {productsData.map((product) => {
          return <Product key={product?.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
