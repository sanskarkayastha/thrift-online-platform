import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/user";
import { getAllProduct } from "../../services/product";
import "../../Css/SavedListings.css";
import ProductCard from "../../components/ProductCard";

const SavedListings = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const currentUserId = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSaved = async () => {
      if (!currentUserId) return;

      const userRes = await getUserById(currentUserId);
      const savedIds = userRes.data.savedListings || [];

      const allProducts = await getAllProduct();
      const saved = allProducts.filter((p) => savedIds.includes(p.id));
      setSavedProducts(saved);
    };

    fetchSaved();
  }, [currentUserId]);

  if (!currentUserId) {
    return <p>Please login to see your saved listings.</p>;
  }

  return (
    <div className="listings-wrapper">
      {savedProducts.length === 0 ? (
        <div className="no-listings">No saved products yet.</div>
      ) : (
        <div className="listings-container">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListings;
