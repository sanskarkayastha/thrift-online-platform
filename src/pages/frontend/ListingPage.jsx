import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAllProducts, getVerifiedProducts } from "../../services/product";
import { getUserById } from "../../services/user";
import "../../Css/ListingsPage.css";
import ProductCard from "../../components/ProductCard";

const ListingsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
    verified: false,
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");
  const onlyVerified = query.get("filter") === "verified";

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

    
      if (filter.category) {
        data = data.filter((p) => p.category === filter.category);
      }
      if (filter.subCategory) {
        data = data.filter((p) => p.subCategory === filter.subCategory);
      }
      if (filter.verified) {
        data = data.filter((p) => p.verify === "Yes");
      }

      setProducts(data);

      const cats = [...new Set(data.map((p) => p.category))];
      setCategories(cats);

      if (filter.category) {
        const subs = [
          ...new Set(
            data
              .filter((p) => p.category === filter.category)
              .map((p) => p.subCategory)
          ),
        ];
        setSubCategories(subs);
      } else {
        setSubCategories([]);
      }
    };

    fetchData();
  }, [filter, search, onlyVerified]);

  return (
    <div className="listings-page">
      {/* Sidebar */}
      <aside className="listings-sidebar">
        <h3>Filters</h3>

        {/* Category Filter */}
        <label>Category</label>
        <select
          value={filter.category}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value, subCategory: "" })
          }
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Subcategory Filter */}
        {subCategories.length > 0 && (
          <>
            <label>Subcategory</label>
            <select
              value={filter.subCategory}
              onChange={(e) =>
                setFilter({ ...filter, subCategory: e.target.value })
              }
            >
              <option value="">All</option>
              {subCategories.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Verified Filter */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filter.verified}
            onChange={(e) =>
              setFilter({ ...filter, verified: e.target.checked })
            }
          />
          Verified Products
        </label>
      </aside>

      {/* Main Content */}
      <main className="listings-content">
        <h2>Browse Products</h2>
        <div className="listings-grid listings-container">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="listings-empty">No products found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListingsPage;
