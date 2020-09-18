import React, { useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import './Forms.css'
import { toast } from "react-toastify";

const EditCampground = () => {
   const [input, setInput] = useState({});

   const history = useHistory();
   const { id } = useParams();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await Axios.put(`${process.env.REACT_APP_API_URL}/campgrounds/${id}`, input);
      history.push(`/campgrounds/${id}`);
      toast.success("Update success")
   };

   const fetchCampground = async () => {
      const response = await Axios.get(
         `${process.env.REACT_APP_API_URL}/campgrounds/${id}/edit`
      );
      const foundCampground = response.data;
      setInput(foundCampground);
   };

   useEffect(() => {
      fetchCampground();
   }, []);

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
                     <input type="submit" value="Update" />
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

export default EditCampground;
