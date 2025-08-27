import React from "react";
import { Outlet, NavLink } from "react-router";
import "../../Css/ProfileLayout.css";
import { User, List, LogOut, MessageCircle, Heart } from "lucide-react";

const ProfileLayout = () => {
  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <h2 className="sidebar-title">Account</h2>
        <nav className="sidebar-nav">
          <NavLink to="/profile" end className="sidebar-link">
            <User size={18} /> Profile
          </NavLink>
          <NavLink to="MyListings" className="sidebar-link">
            <List size={18} /> My Listings
          </NavLink>
          <NavLink to="savedListings" className="sidebar-link">
            <Heart size={18} /> Saved
          </NavLink>

          <NavLink to="messages" className="sidebar-link">
            <MessageCircle size={18} /> Messages
          </NavLink>
          <NavLink to="/logout" className="sidebar-link logout">
            <LogOut size={18} /> Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="profile-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
