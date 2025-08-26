import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts, getVerifiedProducts } from "../services/product";
import ProductCard from "../components/ProductCard";
import styles from "./ListingsPage.module.css";
import { getUserById } from "../../services/user";

const ListingsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filter = query.get("filter");
  const search = query.get("search");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(filter === "verified");

  useEffect(() => {
    const userId = localStorage.getItem("authToken");
  
    const fetchData = async () => {
      let data = onlyVerified
        ? await getVerifiedProducts(userId)
        : await getAllProducts(userId);
  
     
      if (search) {
        const lowerSearch = search.toLowerCase();
  
    
        const usersCache = {};
  
        for (let product of data) {
          if (!usersCache[product.userId]) {
            try {
              const res = await getUserById(product.userId);
              usersCache[product.userId] = res.data.fullName.toLowerCase();
            } catch {
              usersCache[product.userId] = "";
            }
          }
        }
  
        data = data.filter((p) => {
          const sellerName = usersCache[p.userId] || "";
          return (
            p.productName.toLowerCase().includes(lowerSearch) ||
            (p.productDescription &&
              p.productDescription.toLowerCase().includes(lowerSearch)) ||
            (p.tags && p.tags.toLowerCase().includes(lowerSearch)) ||
            sellerName.includes(lowerSearch)
          );
        });
      }
  
      if (subCategory) {
        data = data.filter((p) => p.subCategory === subCategory);
      }
  
      setProducts(data);
  
      const cats = [...new Set(data.map((p) => p.category))];
      setCategories(cats);
    };
  
    fetchData();
  }, [filter, search, onlyVerified, subCategory]);

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h2>Browse Products</h2>
      </div>

      <div className="listings-grid">
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="listings-empty">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
