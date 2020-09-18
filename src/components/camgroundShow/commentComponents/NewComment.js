import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const NewComment = ({ id }) => {
   const [newComment, setNewComment] = useState();
   const [isOpen, setIsOpen] = useState(false);
   const history = useHistory();

   const auth_token = localStorage.getItem("auth_token");

   const handleToggleButtonClick = () => {
      if (!auth_token) {
         return history.push("/login");
      }
      setIsOpen(!isOpen);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsOpen(!isOpen)
      //This is very weird to set the comment to an empty string here but that will still work because whenever we call set on any object it doesn't update the object then and there but it actually ques it up and waits for the nex re-render and then it actully updates it so that's why setting the comment to empty string here won't break the code because it will get executed after the re-render and thus will not effect what's passed into the axios body  PS : sorry for such long comment
      setNewComment("");

      await Axios.post(
         `http://localhost:8080/campgrounds/${id}/comments`,
         { newComment },
         {
            headers: {
               Authorisation: `Bearer ${auth_token}`,
            },
         }
      );
   };

   return (
      <>
         <li
            id="commentItem"
            className="list-group-item list-group-item-light"
            style={{ backgroundColor: "#f7f7f7" }}
         >
            <button
               className="btn btn-danger float-right"
               onClick={handleToggleButtonClick}
            >
               Leave a Review
            </button>
         </li>
         <Collapse isOpen={isOpen}>
            <div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <textarea
                           className="form-control"
                           id="exampleFormControlTextarea1"
                           name="newComment"
                           value={newComment || ""}
                           onChange={(e) => {
                              setNewComment(e.target.value);
                           }}
                           rows="3"
                           required
                        />
                     </div>
                     <button type="submit" className="btn btn-danger btn-sm">
                        Submit
                     </button>
                     <button
                        onClick={() => {
                           setNewComment("");
                        }}
                        className="btn btn-secondary btn-sm float right"
                     >
                        Reset
                     </button>
                  </form>
               </div>
            </div>
         </Collapse>
      </>
   );
};

export default NewComment;
