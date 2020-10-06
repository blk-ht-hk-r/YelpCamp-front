import React from "react";
import Axios from "axios";
import EditComment from "../FormsComment/EditComment";

const EachComment = ({ comment, user, id }) => {

   const auth_token = localStorage.getItem("auth_token")

   const handleDelete = async() => {
      await Axios.delete(`${process.env.REACT_APP_API_URL}/campgrounds/${id}/comments/${comment._id}`, {
         headers : {
            Authorisation : `Bearer ${auth_token}`
         }
      })
   }

   return (
      <li className="list-group-item">
         <p>
            <i className="fas fa-user"></i>
            {comment.author.username}
         </p>
         <span className="text-muted">{comment.content}</span>
         {user && user._id === comment.author.id && (
               <>
                  <button
                     className="delBtn btn text-dark btn-sm float-right"
                     onClick={handleDelete}
                  >
                     <i className="fas fa-trash-alt"></i>
                  </button>
                  <EditComment campground_id={id} comment_id={comment._id} />
               </>
            )}
      </li>
   );
};

export default EachComment;
