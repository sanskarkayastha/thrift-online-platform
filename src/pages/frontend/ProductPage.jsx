import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../../services/product";
import { getUserById } from "../../services/user";
import "../../Css/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const prod = await getProductById(id);
        setProduct(prod);

        if (prod.images && prod.images.length > 0) {
          setSelectedImage(prod.images[0]);
        }

        // Fetch seller info
        if (prod.userId) {
          const userResponse = await getUserById(prod.userId);
          setSeller(userResponse.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-page">
      {/* Left: Images */}
      <div className="product-images">
        {selectedImage && (
          <div className="main-image">
            <img src={selectedImage} alt={product.productName} />
          </div>
        )}
        {product.images && product.images.length > 1 && (
          <div className="thumbnail-list">
            {product.images.slice(0, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${
                  selectedImage === img ? "active" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="product-details">
        <h1>{product.productName}</h1>
        <p className="product-price">Rs. {product.price}</p>
        <p className="product-condition">Condition: {product.condition}</p>
        <p className="product-negotiable">
          Negotiable: {product.negotiable === "Yes" ? "✔️" : "❌"}
        </p>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.productDescription}</p>
        </div>

        {product.tags && (
          <div className="product-tags">
            {product.tags.split(",").map(
              (tag, idx) =>
                tag.trim() && (
                  <span key={idx} className="tag">
                    #{tag.trim()}
                  </span>
                )
            )}
          </div>
        )}

        {/* Seller Section */}
        {seller && (
          <div className="seller-section">
            <h3>About Seller</h3>
            <div className="seller-info">
              <img
                src="https://via.placeholder.com/60"
                alt="Seller Avatar"
                className="seller-avatar"
              />
              <div>
                <p className="seller-name">{seller.fullName}</p>
                <p className="seller-email">{seller.email}</p>
                <p className="seller-phone">📞 {seller.phone}</p>
                <p className="seller-address">📍 {seller.address}</p>
              </div>
            </div>
            <button className="btn-message">Message Seller</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
