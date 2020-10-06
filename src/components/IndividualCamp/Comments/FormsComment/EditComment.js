import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const EditComment = ({ campground_id, comment_id }) => {
   const [EditComment, setEditComment] = useState();
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
      setIsOpen(!isOpen);
      //This is very weird to set the comment to an empty string here but that will still work because whenever we call set on any object it doesn't update the object then and there but it actually ques it up and waits for the nex re-render and then it actully updates it so that's why setting the comment to empty string here won't break the code because it will get executed after the re-render and thus will not effect what's passed into the axios body  PS : sorry for such long comment
      setEditComment("");
      await Axios.put(
         `${process.env.REACT_APP_API_URL}/campgrounds/${campground_id}/comments/${comment_id}`,
         { EditComment },
         {
            headers: {
               Authorisation: `Bearer ${auth_token}`,
            },
         }
      );
   };

   return (
      <>
         <button
            className="btn text-dark btn-sm float-right"
            onClick={handleToggleButtonClick}
         >
            <i className="fas fa-pencil-alt"></i>
         </button>
         <Collapse isOpen={isOpen}>
            <div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <textarea
                           className="form-control"
                           id="exampleFormControlTextarea1"
                           name="EditComment"
                           value={EditComment || ""}
                           onChange={(e) => {
                              setEditComment(e.target.value);
                           }}
                           rows="3"
                           required
                        ></textarea>
                     </div>
                     <button type="submit" className="btn btn-danger btn-sm">
                        Submit
                     </button>
                     <button
                        onClick={() => {
                           setEditComment("");
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

export default EditComment;
