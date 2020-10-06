import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
   const auth_token = localStorage.getItem("auth_token");
   
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth_token ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: "/login",
                     state: { from: location },
                  }}
               />
            )
         }
      />
   );
};

export default PrivateRoute;
