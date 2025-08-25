import React from "react";
import "../Css/ProductCard.css";
import { CheckCircle, Tag } from "lucide-react";
import { NavLink } from "react-router";

const ProductCard = ({ product,isListing }) => {
  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-image">
        <img 
          src={product.images[0] || "https://via.placeholder.com/300"} 
          alt={product.productName} 
        />
        {product.verify === "Yes" && (
          <span className="verified-badge">
            <CheckCircle size={14} /> Verified
          </span>
        )}
      </div>

      {/* Details */}
      <div className="product-details">
        <h3>{product.productName}</h3>
        <p className="product-desc">{product.productDescription.slice(0,50) + " ..."}</p>

        {/* Category & Condition */}
        <div className="meta">
          <span className="category">{product.category}</span>
          <span className="condition">{product.condition}</span>
        </div>

        {/* Price & Negotiable */}
        <div className="price-section">
          <span className="price">Rs. {product.price}</span>
          {product.negotiable === "Yes" && (
            <span className="negotiable">Negotiable</span>
          )}
        </div>

        {/* Tags */}
        {product.tags && (
          <div className="tags">
            {product.tags.split(",").map((tag, index) => (
              <span key={index} className="tag">
                <Tag size={12} /> {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {
            !isListing ? (
                <NavLink to={`/product/${product.id}`} className="btn-primary">
                    View Details
                </NavLink>
            ) : (
                <NavLink to={`/editProduct/${product.id}`} className="btn-primary">
                    Edit
                </NavLink>
            ) 
        }
      </div>
    </div>
  );
};

export default ProductCard;
