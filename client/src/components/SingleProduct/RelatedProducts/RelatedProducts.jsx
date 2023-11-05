import Products from "../../Products/Products";

const RelatedProducts = () => {
  return (
    <div>
      <Products relativeProducts={true} innerPage={true} />
    </div>
  );
};

export default RelatedProducts;
