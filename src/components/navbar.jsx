import React, { useState } from "react";
import "../Css/Navbar.css";
import { Search, ShoppingBag, PlusCircle, User } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = (props) => {
  const naviagte = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <a href="/">Thriftify</a>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <Search size={18} />
          <input type="text" placeholder="Search items..." />
        </div>

        {/* Links */}
        <div className="nav-links">
          <a href="#buy"><ShoppingBag size={18}/> Buy</a>
          <a href="#sell"><PlusCircle size={18}/> Sell</a>

          {/* Profile / Auth */}
          {!props.isLoggedIn ? (
            <button className="btn-primary" onClick={()=>naviagte("/login")}>Sign In</button>
          ) : (
            <div className="profile-container">
              <button 
                className="profile-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={20}/> { "Profile"}
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <a href="#profile">My Profile</a>
                  <a href="#listings">My Listings</a>
                  <a href="#settings">Settings</a>
                  <a href="#logout">Log Out</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
