import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";
import ProductCard from "./ProductCard";
import "../Css/AllListingRow.css";

const AllListingRow = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const userId = localStorage.getItem("authToken");
    getAllProducts(userId).then((res) => setProducts(res));
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="all-listings-row">
      <div className="all-listings-header">
        <h2>All Products</h2>
      </div>

      <div className="all-listings-grid listings-container">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="all-listings-load-more">
          <button onClick={() => setVisibleCount((prev) => prev + 9)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllListingRow;
