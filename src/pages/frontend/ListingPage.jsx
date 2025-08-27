import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAllProducts, getVerifiedProducts } from "../../services/product";
import { getUserById } from "../../services/user";
import "../../Css/ListingsPage.css";
import ProductCard from "../../components/ProductCard";

// Full category/subcategory map
const categoryMap = {
  "Clothing & Fashion": ["Men", "Women", "Kids", "Unisex"],
  "Electronics & Gadgets": [
    "Phones", "Laptops", "Cameras", "Audio", "Wearables", "Gaming"
  ],
  "Home & Living": [
    "Furniture", "Kitchenware", "Appliances", "Home Decor", "Lighting"
  ],
  "Books & Media": [
    "Books", "Comics", "Magazines", "CDs/DVDs", "Vinyl", "Games"
  ],
  "Sports & Outdoors": [
    "Fitness", "Outdoor Gear", "Bicycles", "Camping", "Sporting Goods"
  ],
  "Beauty & Personal Care": [
    "Skincare", "Haircare", "Makeup", "Perfume", "Grooming Tools"
  ],
  "Toys, Kids & Baby": [
    "Toys", "Baby Clothes", "Strollers", "Learning Tools"
  ],
  "Collectibles & Vintage": [
    "Antiques", "Memorabilia", "Coins", "Art", "Handmade Crafts"
  ],
  Automotive: ["Car Accessories", "Motorbike Gear", "Tools", "Spare Parts"],
  "Other / Miscellaneous": ["General"],
};

const ListingsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
    verified: false,
    minPrice: "",
    maxPrice: "",
    sort: "", // "lowToHigh", "highToLow", "newest"
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");
  const onlyVerified = query.get("filter") === "verified";
  const preSelectedCategory = query.get("category") || "";

  useEffect(() => {
    const userId = localStorage.getItem("authToken");

    const fetchData = async () => {
      let data = onlyVerified
        ? await getVerifiedProducts(userId)
        : await getAllProducts(userId);

      // 🔹 Search support (products + seller name)
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

      // 🔹 Filters
      if (filter.category) {
        data = data.filter((p) => p.category === filter.category);
      }
      if (filter.subCategory) {
        data = data.filter((p) => p.subCategory === filter.subCategory);
      }
      if (filter.verified) {
        data = data.filter((p) => p.verify === "Yes");
      }
      if (filter.minPrice) {
        data = data.filter((p) => parseInt(p.price.replace(/,/g, "")) >= parseInt(filter.minPrice));
      }
      if (filter.maxPrice) {
        data = data.filter((p) => parseInt(p.price.replace(/,/g, "")) <= parseInt(filter.maxPrice));
      }

      // 🔹 Sorting
      if (filter.sort === "lowToHigh") {
        data.sort(
          (a, b) =>
            parseInt(a.price.replace(/,/g, "")) -
            parseInt(b.price.replace(/,/g, ""))
        );
      } else if (filter.sort === "highToLow") {
        data.sort(
          (a, b) =>
            parseInt(b.price.replace(/,/g, "")) -
            parseInt(a.price.replace(/,/g, ""))
        );
      } else if (filter.sort === "newest") {
        data.sort((a, b) => b.id.localeCompare(a.id)); // assuming id increments
      }

      setProducts(data);
    };

    // Initialize category from query param if available
    if (preSelectedCategory) {
      setFilter((prev) => ({ ...prev, category: preSelectedCategory }));
    }

    fetchData();
  }, [filter, search, onlyVerified, preSelectedCategory]);

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
          {Object.keys(categoryMap).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Subcategory Filter */}
        {filter.category && categoryMap[filter.category] && (
          <>
            <label>Subcategory</label>
            <select
              value={filter.subCategory}
              onChange={(e) =>
                setFilter({ ...filter, subCategory: e.target.value })
              }
            >
              <option value="">All</option>
              {categoryMap[filter.category].map((sc) => (
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

        {/* Price Range */}
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={filter.minPrice}
            onChange={(e) =>
              setFilter({ ...filter, minPrice: e.target.value })
            }
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filter.maxPrice}
            onChange={(e) =>
              setFilter({ ...filter, maxPrice: e.target.value })
            }
          />
        </div>

        {/* Sort */}
        <label>Sort By</label>
        <select
          value={filter.sort}
          onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
        >
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
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
