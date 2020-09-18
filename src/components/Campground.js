import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import LeftBar from "./camgroundShow/LeftBar";
import CampgroundCard from "./camgroundShow/CampgroundCard";
import CommentCard from "./camgroundShow/CommentCard";
import socket from "../components/socket/socket";
import { toast } from "react-toastify";

const Campground = () => {
   const [campground, setCampground] = useState();
   const [user, setUser] = useState();

   const { id } = useParams();
   const history = useHistory();

   const fetchCampground = async () => {
      try {
         const auth_token = localStorage.getItem("auth_token");
         const response = await Axios.get(
            `${process.env.REACT_APP_API_URL}/campgrounds/${id}`,
            {
               headers: {
                  Authorisation: `Bearer ${auth_token}`,
               },
            }
         );
         const { foundCampground, loggedInUser, statusCode } = response.data;
         if(statusCode === 403){
            toast.warning("Trying be smart ass! Ohh Poor")
         }
         setCampground(foundCampground);
         setUser(loggedInUser);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {


      fetchCampground();

      //setting up a event listener in the case of a comment addition
      socket.on("commentsChanged", () => {
         fetchCampground();
      });

      //cleanup function will run on componenet will unmount
      return () => {
         //Turning the socket of or removing the event listener
         socket.off("commenetChanged");
      };
   }, []);

   return (
      <div id="campgroundsContainer" className="container mt-5">
         <div className="row">
            {campground ? (
               <>
                  <LeftBar campground={campground} />
                  <div className="col-md-9">
                     <CampgroundCard
                        campground={campground}
                        user={user}
                        id={id}
                        history={history}
                     />
                     <CommentCard
                        comments={campground.comments}
                        id={id}
                        user={user}
                     />
                  </div>
               </>
            ) : (
               <div>Loading...</div>
            )}
         </div>
      </div>
   );
};

export default Campground;
