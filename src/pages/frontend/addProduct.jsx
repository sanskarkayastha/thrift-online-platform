import { useEffect, useState } from 'react';
import { Camera, X, HelpCircle, Package, Tag, DollarSign } from 'lucide-react';
import { addProduct, convertToBase64, productCategories } from '../../services/product';
import { toast } from 'react-toastify';
import '../../Css/AddProductForm.css';
import { useNavigate } from 'react-router';

const AddProductForm = () => {

  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(
    ()=>{
    const userId = localStorage.getItem("authToken")
    if(userId){
      setUserId(userId)
    }else{
      toast.error("You must be LoggedIn to add Product")
      navigate("/login")
    }
    },[navigate]
  )

  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    category: '',
    subCategory: '',
    condition: '',
    price: '',
    negotiable: '',
    images: [],
    verify: '',
    tags: '',
    userId: userId
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const categories = productCategories

  const conditions = ['Brand New', 'Like New', 'Good', 'Fair', 'Poor'];
  const negotiableOptions = ['Yes', 'No'];
  const verifyOptions = ['Yes', 'No'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        subCategory: ''
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await convertToBase64(files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...base64Images].slice(0, 5)
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
      addProduct(formData).then(res=>{
        if(res){
          toast.success('Product added successfully!');
        }
      }).catch(err=>{
        toast.error('Failed to add product');
      })
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/,/g, '');
    if (numericValue && !isNaN(numericValue)) {
      return new Intl.NumberFormat('en-IN').format(numericValue);
    }
    return value;
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatPrice(value);
    setFormData(prev => ({
      ...prev,
      price: formattedValue
    }));
  };

  return (
    <div className="add-product-container">
      <div className="add-product-wrapper">
        {/* Header */}
        <div className="add-product-header">
          <h1 className="add-product-title">Add New Product</h1>
          <p className="add-product-subtitle">Create your product listing quickly and easily</p>
        </div>

        {/* Main Grid Layout */}
        <div className="add-product-grid">
          
          {/* Left Column - Scrollable Form */}
          <div className="add-product-form-column">
            <div className="add-product-form-scroll">
              <div className="add-product-form-content">
            
                {/* Basic Information Card */}
                <div className="add-product-card">
                  <div className="add-product-card-header">
                    <div className="add-product-card-header-content">
                      <Package size={20} />
                      <h2 className="add-product-card-title">Basic Information</h2>
                    </div>
                  </div>
                  
                  <div className="add-product-card-body">
                    {/* Two columns for basic info */}
                    <div className="add-product-form-grid-2">
                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          className="add-product-input"
                          placeholder="Enter product name"
                        />
                      </div>
                      
                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Condition *
                        </label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleInputChange}
                          className="add-product-select"
                        >
                          <option value="">Select Condition</option>
                          {conditions.map(condition => (
                            <option key={condition} value={condition}>{condition}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="add-product-form-grid-2">
                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="add-product-select"
                        >
                          <option value="">Select Category</option>
                          {Object.keys(categories).map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Subcategory *
                        </label>
                        <select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          disabled={!formData.category}
                          className="add-product-select"
                        >
                          <option value="">Select Subcategory</option>
                          {formData.category && categories[formData.category].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="add-product-form-group">
                      <label className="add-product-label">
                        Product Description *
                      </label>
                      <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        rows="4"
                        className="add-product-textarea"
                        placeholder="Describe your product in detail..."
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Settings Card */}
                <div className="add-product-card">
                  <div className="add-product-card-header">
                    <div className="add-product-card-header-content">
                      <DollarSign size={20} />
                      <h2 className="add-product-card-title">Pricing & Settings</h2>
                    </div>
                  </div>
                  
                  <div className="add-product-card-body">
                    <div className="add-product-form-grid-3">
                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Price (₹) *
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handlePriceChange}
                          className="add-product-input"
                          placeholder="Enter price"
                        />
                      </div>

                      <div className="add-product-form-group">
                        <label className="add-product-label">
                          Negotiable *
                        </label>
                        <select
                          name="negotiable"
                          value={formData.negotiable}
                          onChange={handleInputChange}
                          className="add-product-select"
                        >
                          <option value="">Select Option</option>
                          {negotiableOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div className="add-product-form-group">
                        <label className="add-product-label-with-tooltip">
                          Product Verification *
                          <div className="add-product-tooltip-container">
                            <HelpCircle
                              size={16}
                              className="add-product-tooltip-icon"
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                            />
                            {showTooltip && (
                              <div className="add-product-tooltip">
                                Choose to verify your product with us for increased trust
                              </div>
                            )}
                          </div>
                        </label>
                        <select
                          name="verify"
                          value={formData.verify}
                          onChange={handleInputChange}
                          className="add-product-select"
                        >
                          <option value="">Select Option</option>
                          {verifyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Card */}
                <div className="add-product-card">
                  <div className="add-product-card-header">
                    <div className="add-product-card-header-content">
                      <Tag size={20} />
                      <h2 className="add-product-card-title">Tags & Keywords</h2>
                    </div>
                  </div>
                  
                  <div className="add-product-card-body">
                    <div className="add-product-form-group">
                      <label className="add-product-label">
                        Tags (Optional)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="add-product-input"
                        placeholder="smartphone, android, unlocked, gaming, vintage..."
                      />
                      <p className="add-product-helper-text">Add keywords separated by commas to help buyers find your product</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="add-product-submit-container">
                  <button
                    onClick={handleSubmit}
                    className="add-product-submit-btn"
                  >
                    Publish Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="add-product-images-column">
            <div className="add-product-images-card">
              <div className="add-product-card-header">
                <div className="add-product-card-header-content">
                  <Camera size={20} />
                  <h2 className="add-product-card-title">Product Images</h2>
                </div>
              </div>
              
              <div className="add-product-images-body">
                {/* Upload Area */}
                <div className="add-product-upload-area">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="add-product-upload-input"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload">
                    <div className="add-product-upload-icon-container">
                      <Camera className="add-product-upload-icon" size={24} />
                    </div>
                    <h3 className="add-product-upload-title">Upload Images</h3>
                    <p className="add-product-upload-text">Click to browse</p>
                    <p className="add-product-upload-subtext">Max 5 images, 10MB each</p>
                  </label>
                </div>

                {/* Image Previews - Scrollable if many images */}
                {formData.images.length > 0 && (
                  <div className="add-product-preview-container">
                    <h4 className="add-product-preview-title">Uploaded Images ({formData.images.length}/5)</h4>
                    <div className="add-product-preview-grid">
                      {formData.images.map((image, index) => (
                        <div key={index} className="add-product-image-container">
                          <div className="add-product-image-wrapper">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="add-product-image"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="add-product-remove-btn"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProductForm;