import React, { useLayoutEffect, useState } from "react";
import { Outlet, useLocation} from "react-router";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "../../Css/FrontEndLayout.css";


const FrontEndLayout = () => {
    const location = useLocation()
    const [isLoggedIn, setLoggedIn] = useState(false)
    useLayoutEffect(
        ()=>{
          let token = localStorage.getItem("authToken")
          if(token){
            setLoggedIn(true)
          }
        },[location]
    )
    return (
        <div className="layout">
            <Navbar  isLoggedIn = {isLoggedIn}/>
            <main className="content">
                <Outlet context={{isLoggedIn}} />
            </main>
            <Footer />
        </div>
    );
};

export default FrontEndLayout;
