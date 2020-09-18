import React from "react";
import NewComment from "./commentComponents/NewComment";
import EachComment from "./commentComponents/EachComment";

const CommentCard = ({ comments, id, user }) => {
   return (
      <div className="card shadow-sm mt-4" id="comments">
         <ul className="list-group list-group-flush">
            <NewComment id={id} />
            {comments ?
                comments.map(comment => <EachComment comment={comment} key={comment._id} user={user} id={id}/>)
                :
               <li>Loading...</li>
            }
         </ul>
      </div>
   );
};

export default CommentCard;
