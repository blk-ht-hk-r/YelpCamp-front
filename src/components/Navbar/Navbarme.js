import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbarme.css";
import { useEffect } from "react";
import socket from "../socket/socket";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";

const Navbarme = () => {
   const [user, setUser] = useState();
   const history = useHistory();

   //Getting the id of the campground on which the user clicked to actually match it to the history listener to change the color of the navbar
   // const id = history.location.pathname.split("/")[2]

   const handleToggle = () => {
      document.querySelector("#myNav").classList.toggle("collapse");
   };

   //the function to be called when the screen scrolls
   const myFunction = () => {
      if (
         document.body.scrollTop > 150 ||
         document.documentElement.scrollTop > 150
      ) {
         document.querySelector(".opaque-navbar").classList.add("opaque");
      } else {
         document.querySelector(".opaque-navbar").classList.remove("opaque");
      }
   };

   const fetchUser = useCallback(async () => {
      try {
         const authToken = localStorage.getItem("auth_token");
         if (!authToken) {
            return setUser();
         }
         const response = await Axios.get(
            `${process.env.REACT_APP_API_URL}/getUser`,
            {
               headers: {
                  Authorisation: `Bearer ${authToken}`,
               },
            }
         );
         const loggedInUser = response.data;
         setUser(loggedInUser);
      } catch (err) {
         if (err.response.status === 403) {
            toast.warning("Huhm Trying to be smart! Poor u 😎");
         } else if (err.response.status === 401) {
            toast.warning("Session Expired! Please Login to continue :)");
            history.push("/login");
         } else {
            console.log(err);
         }
      }
   }, [history]);

   const handleLogout = () => {
      localStorage.removeItem("auth_token");
      fetchUser();
   };

   useEffect(() => {
      fetchUser();

      //If the user refeshed the page then the history.listen won't work as then it won't have any location parameter and so to actually decide the class of navbar we also have to add a if-else for each re-rendering of the navbar for the user refresh
      if (
         history.location.pathname === "/campgrounds" ||
         history.location.pathname === "/register" ||
         history.location.pathname === "/login" ||
         history.location.pathname === "/campgrounds/new" ||
         history.location.pathname === "/"
      ) {
         document.querySelector(".opaque-navbar").classList.remove("opaque");
         window.addEventListener("scroll", myFunction);
      } else {
         window.removeEventListener("scroll", myFunction);
      }

      let unlisten = history.listen((location) => {
         if (
            location.pathname === "/campgrounds" ||
            location.pathname === "/register" ||
            location.pathname === "/login" ||
            location.pathname === "/campgrounds/new" ||
            location.pathname === "/"
         ) {
            window.addEventListener("scroll", myFunction);
         } else {
            window.removeEventListener("scroll", myFunction);
         }
      });

      //setting up the socket to listen for any user login/register/logout activity and changing the navbar accordingly
      socket.on("userLoggedIn", (user) => {
         setUser(user);
      });

      return () => {
         socket.off("userLoggedIn");
         unlisten();
      };
   }, [history, fetchUser]);

   return (
      <nav className="navbar navbar-dark fixed-top opaque-navbar opaque navbar-expand-lg">
         <div className="container">
            <Link className="navbar-brand" to="/campgrounds">
               <i className="fas fa-map-signs"></i>
            </Link>
            <button
               type="button"
               className="navbar-toggler"
               target="#myNav"
               onClick={handleToggle}
            >
               <i className="fa fa-bars"></i>
            </button>
            <div className="navbar-collapse" id="myNav">
               <ul className="navbar-nav ml-auto">
                  {user ? (
                     <>
                        <li className="nav-item">
                           <Link className="nav-link" to="#">
                              <i className="fas fa-user"></i>
                              {` ${user.username}`}
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/campgrounds/new" className="nav-link">
                              New
                           </Link>
                        </li>
                        <li className="nav-item" onClick={handleLogout}>
                           <Link className="nav-link" to="#">
                              logout
                           </Link>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className="nav-item">
                           <Link to="/register" className="nav-link">
                              Register
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/login" className="nav-link">
                              Login
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbarme;
