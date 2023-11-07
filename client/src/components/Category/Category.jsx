import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import useFetch from "../../hooks/useFetch";
import "./Category.scss";

const Category = () => {
  const { id } = useParams();
  const { data: productsData } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );

  const { data: categoryData } = useFetch(`/api/categories/${id}`);

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          {categoryData?.data?.attributes?.title}
        </div>
        {productsData && (
          <Products innerPage={true} products={productsData.data} />
        )}
      </div>
    </div>
  );
};

export default Category;
