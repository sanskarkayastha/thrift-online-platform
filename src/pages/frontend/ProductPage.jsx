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

  if (!product) {
    return (
      <div className="product-page-container">
        <div className="product-page-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      {/* Breadcrumb */}
      <div className="product-page-breadcrumb">
        <span>Home</span>
        <span>›</span>
        <span>Products</span>
        <span>›</span>
        <span className="current">{product.productName}</span>
      </div>

      <div className="product-page-grid">
        {/* Left: Images */}
        <div className="product-page-images">
          {selectedImage && (
            <div className="product-page-main-image">
              <img src={selectedImage} alt={product.productName} />
              {product.verified && (
                <div className="product-page-verified-badge">
                  ✓ Verified
                </div>
              )}
            </div>
          )}
          
          {product.images && product.images.length > 1 && (
            <div className="product-page-thumbnails">
              {product.images.slice(0, 5).map((img, index) => (
                <div
                  key={index}
                  className={`product-page-thumbnail ${
                    selectedImage === img ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="product-page-details">
          {/* Header */}
          <div className="product-page-header">
            <h1>{product.productName}</h1>
            <div className="product-page-price">Rs. {product.price}</div>
            <div className="product-page-status available">
              ● Available
            </div>
          </div>

          {/* Product Info */}
          <div className="product-page-info-grid">
            <div className="product-page-info-item">
              <div className="product-page-info-label">Condition</div>
              <div className="product-page-info-value">{product.condition}</div>
            </div>
            
            <div className="product-page-info-item">
              <div className="product-page-info-label">Negotiable</div>
              <div className={`product-page-info-value ${
                product.negotiable === "Yes" 
                  ? "product-page-negotiable-yes" 
                  : "product-page-negotiable-no"
              }`}>
                {product.negotiable === "Yes" ? "✓ Yes" : "✗ No"}
              </div>
            </div>

            {product.category && (
              <div className="product-page-info-item">
                <div className="product-page-info-label">Category</div>
                <div className="product-page-info-value">{product.category}</div>
              </div>
            )}

            {product.location && (
              <div className="product-page-info-item">
                <div className="product-page-info-label">Location</div>
                <div className="product-page-info-value">📍 {product.location}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="product-page-description">
            <h3>📝 Description</h3>
            <p>{product.productDescription}</p>
          </div>

          {/* Tags */}
          {product.tags && (
            <div>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🏷️ Tags
              </h3>
              <div className="product-page-tags">
                {product.tags.split(",").map(
                  (tag, idx) =>
                    tag.trim() && (
                      <span key={idx} className="product-page-tag">
                        #{tag.trim()}
                      </span>
                    )
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-page-actions">
            <button className="product-page-btn-primary">
              💬 Message Seller
            </button>
            <button className="product-page-btn-secondary">
              ❤️ Save
            </button>
          </div>
        </div>
      </div>

      {/* Seller Section */}
      {seller && (
        <div className="product-page-seller-section" style={{ marginTop: '40px' }}>
          <h3>👤 About Seller</h3>
          <div className="product-page-seller-info">
            <img
              src="https://via.placeholder.com/60"
              alt="Seller Avatar"
              className="product-page-seller-avatar"
            />
            <div className="product-page-seller-details">
              <p className="product-page-seller-name">{seller.fullName}</p>
              <p className="product-page-seller-contact">
                <span className="product-page-seller-contact-icon">✉️</span>
                {seller.email}
              </p>
              <p className="product-page-seller-contact">
                <span className="product-page-seller-contact-icon">📞</span>
                {seller.phone}
              </p>
              <p className="product-page-seller-contact">
                <span className="product-page-seller-contact-icon">📍</span>
                {seller.address}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button className="product-page-btn-primary">
              💬 Contact Seller
            </button>
            <button className="product-page-btn-secondary">
              👤 View Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;