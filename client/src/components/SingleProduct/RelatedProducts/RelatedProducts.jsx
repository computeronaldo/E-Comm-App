import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";

const RelatedProducts = ({ categoryId, productId }) => {
  const { data } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${categoryId}`
  );

  const relatedProducts = data?.data?.filter(
    (product) => product.id !== parseInt(productId)
  );

  return (
    <div>
      {relatedProducts && (
        <Products
          relative={true}
          relatedProducts={relatedProducts}
          innerPage={true}
        />
      )}
    </div>
  );
};

export default RelatedProducts;
