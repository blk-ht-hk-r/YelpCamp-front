import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./Auth.css";
import { toast } from "react-toastify";

const Register = () => {
   const [credentials, setCredentials] = useState({});
   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await Axios.post(
            `${process.env.REACT_APP_API_URL}/register`,
            credentials
         );
         const token = res.data;
         localStorage.setItem("auth_token", token);
         history.push("/campgrounds");
         toast.success("Welcome to YelpCamp!")
      } catch (err) {
         if(err.response.status === 400){
            toast.error("User with the given username already exists")
         }
      }
   };

   return (
      <div className="banner">
         <div className="container">
            <div className="row">
               <div className="col"></div>
               <div className="col-5">
                  <div className="box shadow">
                     <h1 className="text-center">Sign Up</h1>
                     <form className="needs-validation" onSubmit={handleSubmit}>
                        <input
                           type="text"
                           name="username"
                           value={credentials.username || ""}
                           onChange={(e) => {
                              setCredentials({
                                 ...credentials,
                                 username: e.target.value,
                              });
                           }}
                           placeholder="Username"
                           required
                        />
                        <input
                           type="password"
                           name="password"
                           value={credentials.password || ""}
                           onChange={(e) => {
                              setCredentials({
                                 ...credentials,
                                 password: e.target.value,
                              });
                           }}
                           placeholder="Password"
                           required
                        />
                        <input type="submit" value="Sign Up" />
                     </form>
                     <div className="bottom-content">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
