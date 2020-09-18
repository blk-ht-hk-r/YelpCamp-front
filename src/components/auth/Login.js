import React from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import "./Auth.css";
import { toast } from "react-toastify";
const Login = () => {
   const [credentials, setCredentials] = useState({});
   const history = useHistory();
   const location = useLocation();

   let { from } = location.state || { from: { pathname: "/campgrounds" } };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await Axios.post(
            "http://localhost:8080/login",
            credentials
         );
         const token = response.data;
         localStorage.setItem("auth_token", token);
         history.replace(from);
         toast.success("Logged In", {
            autoClose : 1500
         })
      } catch (err) {
         if(err.response.status === 400){
            toast.error("Username doesn't exist!")
         }
         else if(err.response.status === 401){
            toast.error("Password is incorrect")
         }
         else{
            console.log(err)
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
                     <h1>Login</h1>
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
                        <input type="submit" value="Login" />
                     </form>
                     <div className="bottom-content">
                        Don't have an account?
                        <Link to="/register"> Sign Up</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
