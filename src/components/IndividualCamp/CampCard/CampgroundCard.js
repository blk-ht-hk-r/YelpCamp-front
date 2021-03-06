import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";

const CampgroundCard = ({ campground, user, id, history }) => {
   const createdAt = new Date(Date.parse(campground.createdAt));
   const date = createdAt.getDate()
   const month = createdAt.toLocaleDateString("default", {month : "long"}).substr(0,3)

   const handleDelete = async () => {
      try {
         await Axios.delete(
            `${process.env.REACT_APP_API_URL}/campgrounds/${id}`
         );
         history.push("/campgrounds");
         toast.success("Sorry to hear that you delted your Campground");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="card shadow-sm">
         <img className="card-img-top" src={campground.image} alt="" />
         <div className="card-body">
            <h5 className="card-title float-right">{campground.price}</h5>
            <h5 className="card-title text-capitalize">{campground.title}</h5>
            <p className="card-text">{campground.body}</p>
            <hr />
            <p className="card-text text-muted">
               <span>
                   by {campground.author.username} at {`${date} ${month}`}
               </span>
            </p>
            {user && user._id === campground.author.id && (
               <>
                  <button
                     className="delBtn btn text-dark btn-lg"
                     onClick={handleDelete}
                  >
                     <i className="fas fa-trash-alt"></i>
                  </button>
                  <Link
                     to={`/campgrounds/${id}/edit`}
                     className="btn text-dark btn-lg float-right"
                  >
                     <i className="fas fa-pencil-alt"></i>
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default CampgroundCard;
