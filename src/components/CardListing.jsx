import React from "react";
import "../Css/CardListing.css";
import { 
  Heart, 
  MapPin, 
  Calendar,
  Shirt,
  Smartphone,
  Home,
  Book,
  Dumbbell,
  Sparkles,
  Baby,
  Star,
  Car,
  Package
} from 'lucide-react';

const categories = {
  'Clothing & Fashion': { icon: Shirt, subcategories: ['Men', 'Women', 'Kids', 'Unisex'] },
  'Electronics & Gadgets': { icon: Smartphone, subcategories: ['Phones', 'Laptops', 'Cameras', 'Audio', 'Wearables', 'Gaming'] },
  'Home & Living': { icon: Home, subcategories: ['Furniture', 'Kitchenware', 'Appliances', 'Home Decor', 'Lighting'] },
  'Books & Media': { icon: Book, subcategories: ['Books', 'Comics', 'Magazines', 'CDs/DVDs', 'Vinyl', 'Games'] },
  'Sports & Outdoors': { icon: Dumbbell, subcategories: ['Fitness', 'Outdoor Gear', 'Bicycles', 'Camping', 'Sporting Goods'] },
  'Beauty & Personal Care': { icon: Sparkles, subcategories: ['Skincare', 'Haircare', 'Makeup', 'Perfume', 'Grooming Tools'] },
  'Toys, Kids & Baby': { icon: Baby, subcategories: ['Toys', 'Baby Clothes', 'Strollers', 'Learning Tools'] },
  'Collectibles & Vintage': { icon: Star, subcategories: ['Antiques', 'Memorabilia', 'Coins', 'Art', 'Handmade Crafts'] },
  'Automotive': { icon: Car, subcategories: ['Car Accessories', 'Motorbike Gear', 'Tools', 'Spare Parts'] },
  'Other / Miscellaneous': { icon: Package, subcategories: ['General'] }
};

const CardListing = () => {
  return (
    <div className="cardlisting-wrapper">
      {/* Categories Section */}
      <section className="categories-section">
          <h2 className="categories-title">Browse Categories</h2>
          <div className="categories-grid">
            {Object.entries(categories).map(([categoryName, categoryData]) => {
              const IconComponent = categoryData.icon;
              return (
                <div key={categoryName} className="category-card">
                  <div className="category-header">
                    <IconComponent className="category-icon" />
                    <span className="category-name">{categoryName}</span>
                  </div>
                  <div className="category-subcategories">
                    {categoryData.subcategories.map((sub) => (
                      <span key={sub} className="subcategory-tag">{sub}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
    </div>
  );
};

export default CardListing;
