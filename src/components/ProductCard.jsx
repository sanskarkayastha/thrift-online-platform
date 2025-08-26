import React, { useState } from "react";
import "../Css/ProductCard.css";
import { CheckCircle, Tag, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { deleteProductById } from "../services/product";
import { toast } from "react-toastify";

const ProductCard = ({ product, isListing, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteProductById(product.id);
      toast.success("Product Deleted Successfully");
      setShowDeleteModal(false);

      // Call parent callback to refresh listings
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="product-card-wrapper">
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
            <p className="product-desc">
              {product.productDescription.length > 50
                ? product.productDescription.slice(0, 50) + " ..."
                : product.productDescription}
            </p>

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
            {!isListing ? (
              <NavLink to={`/product/${product.id}`} className="btn-primary">
                View Details
              </NavLink>
            ) : (
              <div className="listing-actions">
                <NavLink to={`/editProduct/${product.id}`} className="btn-primary btn-edit">
                  Edit
                </NavLink>
                <button 
                  onClick={handleDeleteClick}
                  className="btn-delete"
                  title="Delete Product"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={product.productName}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProductCard;