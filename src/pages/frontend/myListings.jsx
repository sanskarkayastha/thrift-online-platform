import { useEffect, useState } from "react";
import { getUserListings } from "../../services/product";
import ProductCard from "../../components/ProductCard";
import "../../Css/MyListings.css"; // import css file

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("authToken");
    if (id) {
      getUserListings(id).then((response) => {
        if (response.length > 0) {
          setListings(response);
        }
      });
    }
  }, []);

  return (
    <div className="listings-wrapper">
      {listings.length > 0 ? (
        <div className="listings-container">
          {listings.map((product) => (
            <ProductCard key={product.id} product={product} isListing={true}/>
          ))}
        </div>
      ) : (
        <p className="no-listings">No listings found.</p>
      )}
    </div>
  );
};

export default MyListings;
