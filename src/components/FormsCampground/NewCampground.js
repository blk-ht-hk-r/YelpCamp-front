import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Forms.css";
import { toast } from "react-toastify";

const NewCampgroud = () => {
   const [input, setInput] = useState({});
   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const auth_token = localStorage.getItem("auth_token");
      try {
         const response = await axios.post(
            "http://localhost:8080/campgrounds",
            input,
            {
               headers: {
                  Authorisation: `Bearer ${auth_token}`,
               },
            }
         );
         const campground_id = response.data._id;
         history.push(`/campgrounds/${campground_id}`);
         toast.success("Campground Created")
      } catch (err) {
         if(err.response.status === 403){
            toast.warning("Smart guy aren't you")
         }
      }
   };

   return (
      <div className="banner">
         <div className="row">
            <div className="col"></div>
            <div className="col-6">
               <div className="campground-box shadow">
                  <h1 className="text-center">Create Campground</h1>
                  <form className="needs-validation" onSubmit={handleSubmit}>
                     <input
                        type="text"
                        name="title"
                        value={input.title || ""}
                        onChange={(e) =>
                           setInput({
                              ...input,
                              title: e.target.value,
                           })
                        }
                        placeholder="Name"
                        required
                     />
                     <input
                        type="text"
                        name="image"
                        placeholder="Image Url"
                        value={input.image || ""}
                        onChange={(e) =>
                           setInput({
                              ...input,
                              image: e.target.value,
                           })
                        }
                        required
                     />
                     <input
                        type="number"
                        name="price"
                        placeholder="Price/Night"
                        value={input.price || ""}
                        onChange={(e) =>
                           setInput({
                              ...input,
                              price: e.target.value,
                           })
                        }
                        min="99"
                        step="1"
                        required
                     />
                     <textarea
                        name="body"
                        placeholder="Description"
                        value={input.body || ""}
                        onChange={(e) =>
                           setInput({ ...input, body: e.target.value })
                        }
                        rows="3"
                        required
                     ></textarea>
                     <input type="submit" value="Create" />
                  </form>
                  <Link className="btn btn-link" to="/campgrounds">
                     Go Back
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NewCampgroud;
