import React, { useEffect, useState } from "react";
import { getVerifiedProducts } from "../services/product";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";
import "../Css/VerifiedProductRow.css";

const VerifiedProductRow = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("authToken");
    getVerifiedProducts(userId).then((res) => setProducts(res));
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="verified-row">
      <div className="verified-row-header">
        <h2>Verified Products</h2>
        <span
          className="verified-view-all"
          onClick={() => navigate("/products?filter=verified")}
        >
          View All
        </span>
      </div>

      <div className="verified-grid listings-container">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default VerifiedProductRow;
