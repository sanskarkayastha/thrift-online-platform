import { useEffect, useState } from "react";
import { getUserListings } from "../../services/product";
import ProductCard from "../../components/ProductCard";
import "../../Css/MyListings.css";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    let id = localStorage.getItem("authToken");
    if (id) {
      const response = await getUserListings(id);
      if (response.length > 0) {
        setListings(response);
      } else {
        setListings([]);
      }
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="listings-wrapper">
      {listings.length > 0 ? (
        <div className="listings-container">
          {listings.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isListing={true}
              onDelete={fetchListings} // <-- pass the callback here
            />
          ))}
        </div>
      ) : (
        <p className="no-listings">No listings found.</p>
      )}
    </div>
  );
};

export default MyListings;
