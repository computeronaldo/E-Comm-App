import { Link } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories }) => {
  const categoriesData = categories.data;

  const categoryContent = categoriesData.map((category) => {
    return (
      <div key={category.id} className="category">
        <Link to={`/category/${category.id}`}>
          <img
            src={`http://localhost:1337${category.attributes.img.data.attributes.formats.small.url}`}
            alt={`${category.attributes.img.data.attributes.name}`}
          />
        </Link>
      </div>
    );
  });

  return (
    <div className="shop-by-category">
      <div className="categories">{categoryContent}</div>
    </div>
  );
};

export default Category;
