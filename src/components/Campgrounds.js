import React, { useState, useEffect } from "react";
import Campgroundscard from "./Campgroundscard";
import Title from "./Title";
import Axios from "axios";
import { toast } from "react-toastify";

const Campgrounds = () => {
   const [campgrounds, setCampgrounds] = useState([]);

   const fetchCampgrounds = async () => {
      try {
         const res = await Axios.get("http://localhost:8080/campgrounds");
         setCampgrounds(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchCampgrounds()
   }, []);

   const campgroundsAll = campgrounds.map((campground) => (
      <Campgroundscard key={campground._id} campground={campground} />
   ));

   return (
      <>
         <Title />
         <div className="container">
            <div className="row">{campgroundsAll}</div>
         </div>
      </>
   );
};

export default Campgrounds;
