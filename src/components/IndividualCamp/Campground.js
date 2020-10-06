import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import LeftBar from "./LeftBar/LeftBar";
import CampgroundCard from "./CampCard/CampgroundCard";
import CommentCard from "./Comments/CommentCard";
import socket from "../socket/socket";
import { toast } from "react-toastify";
import "./Campground.css";

const Campground = () => {
   const [campground, setCampground] = useState();
   const [user, setUser] = useState();

   const { id } = useParams();
   const history = useHistory();

   const fetchCampground = useCallback(async () => {
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
         if (statusCode === 403) {
            toast.warning("Trying be smart ass! Ohh Poor");
         }
         setCampground(foundCampground);
         setUser(loggedInUser);
      } catch (error) {
         console.log(error);
      }
   }, [id]);

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
   }, [fetchCampground]);

   return (
      <div id="campgroundsContainer" className="container">
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
