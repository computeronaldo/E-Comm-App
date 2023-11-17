import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const Search = ({ setShowSearchBar }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  let { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  if (!query.length) {
    data = null;
  }

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose
          onClick={() => {
            setShowSearchBar(false);
          }}
        />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {data?.data?.map((item) => {
            return (
              <div
                key={item?.id}
                className="search-result-item"
                onClick={() => {
                  navigate("/product/" + item.id);
                  setShowSearchBar(false);
                }}
              >
                <div className="img-container">
                  <img
                    src={`http://localhost:1337${item?.attributes?.img?.data[0]?.attributes?.formats?.small?.url}`}
                    alt="product-img"
                  />
                </div>
                <div className="prod-details">
                  <span className="name">{item?.attributes?.title}</span>
                  <span className="desc">{item?.attributes?.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
