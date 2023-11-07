import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";
import "./Home.scss";

const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getCategories = () => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
    });
  };

  const getProducts = () => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      setProducts(res);
    });
  };
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          {categories && <Category categories={categories} />}
          {products && <Products products={products.data} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
