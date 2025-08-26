import React, { useEffect, useState } from "react";
import "../../Css/ProfilePage.css";
import { User, Mail, Calendar, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { getUserById } from "../../services/user";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
        let id = localStorage.getItem("authToken")
        console.log("here" + id)
        if(id){
            getUserById(id).then(
                (response)=>{
                    console.log(response.data)
                    if(response.data){
                        setUser(response.data)
                    }
                }
            )

        }else{
            navigate("/login")
        }
  }, [navigate]);

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <img
          src=""
          alt="User Avatar"
          className="profile-avatar"
        />
        <div>
          <h2>{user.fullName}</h2>
          <p><Mail size={16}/> {user.email}</p>
          <p><Calendar size={16}/> Joined {user.joined || "no date"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-item"><Package size={18}/> {user.listings} Listings</div>
        <div className="stat-item"><User size={18}/> {user.verifiedListings} Verified</div>
      </div>

      <button className="btn-edit">Edit Profile</button>
    </div>
  );
};

export default ProfilePage;
