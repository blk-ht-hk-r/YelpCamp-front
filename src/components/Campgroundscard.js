import React from "react";
import { Link } from "react-router-dom";

const Campgroundscard = (props) => {
   return (
      <div className="col-sm-12 col-md-6 col-lg-4">
         <div className="card indexCards shadow border-0 mt-4">
            <Link to={`/campgrounds/${props.campground._id}`}>
               <img
                  id="campgroundCard"
                  className="card-img-top"
                  src={props.campground.image}
                  alt=""
               />
            </Link>
            <div className="card-body">
               <h5 className="card-title text-capitalize">
                  <Link to={`/campgrounds/${props.campground._id}`}>
                     {props.campground.title}{" "}
                  </Link>
               </h5>
            </div>
         </div>
      </div>
   );
};

export default Campgroundscard;
