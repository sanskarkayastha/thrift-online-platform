import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import "../Css/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  productName, 
  isDeleting 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };


  return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal">
        {/* Header */}
        <div className="delete-modal-header">
          <div className="delete-modal-icon">
            <AlertTriangle size={24} />
          </div>
          <h2>Delete Product</h2>
          <button 
            className="delete-modal-close"
            onClick={onClose}
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="delete-modal-content">
          <p className="delete-modal-message">
            Are you sure you want to delete <strong>"{productName}"</strong>?
          </p>
          <p className="delete-modal-warning">
            This action cannot be undone. The product will be permanently removed from your listings.
          </p>
        </div>

        {/* Actions */}
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-cancel"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            className="delete-modal-confirm"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="delete-modal-spinner"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;