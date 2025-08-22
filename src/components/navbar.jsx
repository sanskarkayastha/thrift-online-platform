import React, { useEffect, useState } from 'react';
import { Search, Heart, MessageCircle, User, Settings, LogOut, Plus, LogIn } from 'lucide-react';
import '../Css/Navbar.css';
import { logUserOut } from '../services/auth';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {

  const [isUserLoggedIn, setUserState] = useState(false)
  const navigate = useNavigate()
  useEffect(
    ()=>{
      const id = localStorage.getItem("authToken")
      if(id){
        setUserState(true)
      }else{
        setUserState(false)
      }
    },[]
  )

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = ()=>{
    logUserOut()
    toast.success("Logged Out Successfully")
    setUserState(false)
    navigate("/")
  }

  return (
    <nav className="marketplace-navbar">
      <div className="marketplace-nav-container">
        {/* Logo */}
        <div className="marketplace-nav-logo">
          <NavLink to="/">Thrifty</NavLink>
        </div>

        {/* Search Bar */}
        <div className="marketplace-nav-search">
          <Search size={18} color="#6b7280" />
          <input type="text" placeholder="Search for items..." />
        </div>

        {/* Navigation Links */}
        <div className="marketplace-nav-links">
          <NavLink to="/favorites">
            <Heart size={18} />
            <span>Favorites</span>
          </NavLink>
          <NavLink to="/messages">
            <MessageCircle size={18} />
            <span>Messages</span>
          </NavLink>
          <NavLink to="/addProduct" className="marketplace-btn-primary">
            <Plus size={18} />
            <span>Sell</span>
          </NavLink>

          {
            isUserLoggedIn ? (
              <>
                {/* Profile Container */}
                <div className="marketplace-profile-container">
                  <button className="marketplace-profile-btn" onClick={toggleDropdown}>
                    <User size={20} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`marketplace-profile-dropdown ${isDropdownOpen ? 'open' : 'closed'}`}>
                    <NavLink to="/profile">
                      <User size={16} />
                      My Profile
                    </NavLink>
                    <a href="/settings">
                      <Settings size={16} />
                      Settings
                    </a>
                    <div className="marketplace-dropdown-divider"></div>
                    <button onClick={handleLogOut}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login Button for non-logged in users */}
                <a href="/login" className="marketplace-btn-login">
                  <LogIn size={18} />
                  <span>Login</span>
                </a>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;