import { useState } from 'react';
import { Camera, X, HelpCircle, Package, Tag, DollarSign, FileText } from 'lucide-react';
import { addProduct, convertToBase64 } from '../../services/product';
import { toast } from 'react-toastify';

const AddProductForm = () => {
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
    tags: ''
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const categories = {
    'Clothing & Fashion': ['Men', 'Women', 'Kids', 'Unisex'],
    'Electronics & Gadgets': ['Phones', 'Laptops', 'Cameras', 'Audio', 'Wearables', 'Gaming'],
    'Home & Living': ['Furniture', 'Kitchenware', 'Appliances', 'Home Decor', 'Lighting'],
    'Books & Media': ['Books', 'Comics', 'Magazines', 'CDs/DVDs', 'Vinyl', 'Games'],
    'Sports & Outdoors': ['Fitness', 'Outdoor Gear', 'Bicycles', 'Camping', 'Sporting Goods'],
    'Beauty & Personal Care': ['Skincare', 'Haircare', 'Makeup', 'Perfume', 'Grooming Tools'],
    'Toys, Kids & Baby': ['Toys', 'Baby Clothes', 'Strollers', 'Learning Tools'],
    'Collectibles & Vintage': ['Antiques', 'Memorabilia', 'Coins', 'Art', 'Handmade Crafts'],
    'Automotive': ['Car Accessories', 'Motorbike Gear', 'Tools', 'Spare Parts'],
    'Other / Miscellaneous': ['General']
  };

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
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full px-4">
        {/* Header */}
        <div className="text-center py-6 flex-shrink-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Product</h1>
          <p className="text-gray-600 text-lg">Create your product listing quickly and easily</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
          
          {/* Left Column - Scrollable Form */}
          <div className="lg:col-span-2">
            <div className="h-full overflow-y-auto pr-4 p-6 bg-gray-50 rounded-xl space-y-6" style={{ maxHeight: 'calc(100vh - 160px)' }}>
            
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center">
                  <Package className="text-white mr-3" size={20} />
                  <h2 className="text-lg font-semibold text-white">Basic Information</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Two columns for basic info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subcategory *
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      disabled={!formData.category}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Subcategory</option>
                      {formData.category && categories[formData.category].map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your product in detail..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Settings Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center">
                  <DollarSign className="text-white mr-3" size={20} />
                  <h2 className="text-lg font-semibold text-white">Pricing & Settings</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handlePriceChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Negotiable *
                    </label>
                    <select
                      name="negotiable"
                      value={formData.negotiable}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Option</option>
                      {negotiableOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      Product Verification *
                      <div className="relative ml-2">
                        <HelpCircle
                          size={16}
                          className="text-gray-400 hover:text-indigo-600 cursor-help transition-colors"
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        />
                        {showTooltip && (
                          <div className="absolute bottom-6 left-0 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
                            Choose to verify your product with us for increased trust
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        )}
                      </div>
                    </label>
                    <select
                      name="verify"
                      value={formData.verify}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center">
                  <Tag className="text-white mr-3" size={20} />
                  <h2 className="text-lg font-semibold text-white">Tags & Keywords</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (Optional)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="smartphone, android, unlocked, gaming, vintage..."
                  />
                  <p className="text-xs text-gray-500 mt-2">Add keywords separated by commas to help buyers find your product</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className=" bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Publish Product
              </button>
            </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center">
                  <Camera className="text-white mr-3" size={20} />
                  <h2 className="text-lg font-semibold text-white">Product Images</h2>
                </div>
              </div>
              
              <div className="p-6 h-full flex flex-col">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 mb-6 flex-shrink-0">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Camera className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-700 mb-1">Upload Images</h3>
                    <p className="text-sm text-gray-500 mb-1">Click to browse</p>
                    <p className="text-xs text-gray-400">Max 5 images, 10MB each</p>
                  </label>
                </div>

                {/* Image Previews - Scrollable if many images */}
                {formData.images.length > 0 && (
                  <div className="flex-1 overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Uploaded Images ({formData.images.length}/5)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
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