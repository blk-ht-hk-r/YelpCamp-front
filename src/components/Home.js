import React from "react";
import './landing.css';
import { Link } from "react-router-dom";

const Home = () => {
   return (
      <div className="landing-body">
         <div id="landing-header">
            <h1>Welcome To YelpCamp</h1>
            <Link to="/campgrounds" className="btn btn-lg btn-success">
               View All Campgrounds
            </Link>
         </div>

         <ul className="slideshow">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
         </ul>
      </div>
   );
};

export default Home;
